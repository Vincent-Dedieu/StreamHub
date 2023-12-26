import { db } from "./db";
//import getSelf from "./auth-service";

export const getRecommanded = async () => {
  //const self = await getSelf();

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
