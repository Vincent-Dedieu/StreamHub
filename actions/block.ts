"user server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  try {
    //TODO : Adapt to disconnect from livestream
    // TODO : Allow ability to kick the user(or guest) from the livestream
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`);
    }

    return blockedUser;
  } catch (error) {
    throw new Error("error");
  }
};

export const onUnblock = async (id: string) => {
  try {
    const unblockedUser = await unblockUser(id);

    revalidatePath("/");

    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
  } catch (error) {
    throw new Error("error");
  }
};