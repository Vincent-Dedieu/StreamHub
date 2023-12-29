"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You just followed ${data.following.username}`))
        .catch(() => toast.error("Failed to follow user."));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`You just unfollowed ${data.following.username}`))
        .catch(() => toast.error("Failed to unfollow user."));
    });
  };

  const onClick = isFollowing ? handleUnfollow : handleFollow;

  return (
    <Button onClick={onClick} disabled={isPending} variant="primary">
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
