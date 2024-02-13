"use client";
import { ReceivedChatMessage } from "@livekit/components-react";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground"> {isHidden ? "Chat is disabled" : "Welcome to the Chat"} </p>
      </div>
    );
  }

  return <div>ChatList</div>;
};
