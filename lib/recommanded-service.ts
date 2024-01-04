import { db } from "./db";
import getSelf from "./auth-service";

// export const getRecommanded = async () => {
//   let userId;

//   try {
//     const self = await getSelf();
//     userId = self.id;
//   } catch (error) {
//     userId = null;
//   }

//   let users = [];

//   if (userId) {
//     // Get the IDs of the users followed by the current user
//     const followedUserIds = (
//       await db.follow.findMany({
//         where: { followerId: userId },
//         select: { followingId: true },
//       })
//     ).map((follow) => follow.followingId);

//     // Get the IDs of the users blocked by the current user
//     const blockedUsersIds = (
//       await db.block.findMany({
//         where: { blockerId: userId },
//         select: { blockedId: true },
//       })
//     ).map((block) => block.blockedId);

//     // Use these IDs to exclude these users from the findMany query
//     users = await db.user.findMany({
//       where: {
//         AND: [{ id: { notIn: [userId, ...followedUserIds, ...blockedUsersIds] } }],
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//   } else {
//     // If no user is logged in, retrieve all users
//     users = await db.user.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//   }

//   return users;
// };

export const getRecommanded = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];

  if (userId) {
    // Get the IDs of the users followed by the current user
    const followedUserIds = (
      await db.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true },
      })
    ).map((follow) => follow.followingId);

    // Get the IDs of the users who have blocked the current user
    const blockingUserIds = (
      await db.block.findMany({
        where: { blockedId: userId },
        select: { blockerId: true },
      })
    ).map((block) => block.blockerId);

    // Use these IDs to exclude these users from the findMany query
    users = await db.user.findMany({
      where: {
        AND: [{ id: { notIn: [userId, ...followedUserIds, ...blockingUserIds] } }],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    // If no user is logged in, retrieve all users
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
