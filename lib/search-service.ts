import { db } from "./db";
import { getSelf } from "./auth-service";

export const getSearch = async (q?: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let blockingUserIds: string[] = [];
  if (userId) {
    // Get the IDs of the users who have blocked the current user
    blockingUserIds = (
      await db.block.findMany({
        where: { blockedId: userId },
        select: { blockerId: true },
      })
    ).map((block) => block.blockerId);
  }

  const excludeUserIds = userId ? [userId, ...blockingUserIds] : blockingUserIds;

  // Get the streams excluding the ones from the blocked users
  const streams = await db.stream.findMany({
    where: {
      userId: { notIn: excludeUserIds },
      OR: [
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          user: {
            username: {
              contains: q,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    select: {
      thumbnailUrl: true,
      isLive: true,
      name: true,
      id: true,
      user: {
        select: {
          username: true,
          imageUrl: true,
        },
      },
    },
    orderBy: [
      {
        isLive: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });

  return streams;
};
