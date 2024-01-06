import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("User not found");
  }

  const user = await db.user.findUnique({
    where: {
      //username: self.username => username can change, id cannot.
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error("User from db not found");
  }

  return user;
};

export default getSelf;

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) throw new Error("User not authenticated");

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) throw new Error("User from db not found");

  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }

  return user;
};
