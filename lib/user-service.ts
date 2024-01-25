import { db } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username },
    include: {
      stream: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
