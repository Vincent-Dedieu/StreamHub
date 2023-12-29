"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You just followed ${data.following.username}`))
        .catch(() => toast.error("Failed to follow user."));
    });
  };

  return (
    <Button onClick={onClick} disabled={isPending || isFollowing} variant="primary">
      Follow
    </Button>
  );
};
