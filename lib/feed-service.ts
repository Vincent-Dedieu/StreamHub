import { db } from "./db";
import { getSelf } from "./auth-service";

export const getStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
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
  } else {
    streams = await db.stream.findMany({
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
  }

  return streams;
};
