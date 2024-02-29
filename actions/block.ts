"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  // if user isnt logged in, he is a guest and his id is a uuid (see actions/token.ts)
  const self = await getSelf();
  let blockedUser;
  try {
    blockedUser = await blockUser(id); // if the user is logged in, we block him with id
  } catch {
    // if the user isn't logged in, then it's a guest so we have recognize him by self.id from getSelf()
    blockedUser = await blockUser(self.id);
  }

  try {
    await roomService.removeParticipant(self.id, id); // roomName is self.id (see ingress.ts)
  } catch {
    //this means the user isnt inside the room
  }

  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
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
