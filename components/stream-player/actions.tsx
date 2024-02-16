"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
}

export const Actions = ({ isFollowing, hostIdentity, isHost }: ActionsProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFollow = async () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => toast.success(`${data.following.username} followed!`))
        .catch(() => toast.error("Failed to follow"));
    });
  };

  const handleUnfollow = async () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => toast.success(`${data.following.username} unfollowed!`))
        .catch(() => toast.error("Failed to unfollow"));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")} />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
