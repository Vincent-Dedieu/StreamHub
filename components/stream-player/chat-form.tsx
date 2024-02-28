"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  isSending: boolean;
}

export const ChatForm = ({
  value,
  onChange,
  onSubmit,
  isHidden,
  isFollowersOnly,
  isDelayed,
  isFollowing,
  isSending,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled = isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  return (
    <form className="flex flex-col items-center gap-y-4 p-3" onSubmit={handleSubmit}>
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          className={cn("border-white/10", isFollowersOnly && "rounded-t-none border-t-0")}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isSending}
          placeholder="Send a message..."
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isSending}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="w-7 h-7" />
        <Skeleton className="w-7 h-12" />
      </div>
    </div>
  );
};
