"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((user) => {
          toast.success(`User ${user.blocked.username} unblocked`);
        })
        .catch(() => {
          toast.error("Error unblocking user");
        });
    });
  };

  return (
    <Button onClick={onClick} disabled={isPending} variant="primary" size="sm">
      Unblock
    </Button>
  );
};
