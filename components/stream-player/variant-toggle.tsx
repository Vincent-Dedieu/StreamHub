"use client";

import { MessagesSquare, Users } from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? Users : MessagesSquare;
  const label = isChat ? "Switch to community" : "Switch to chat";

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  return (
    <Hint label={label} side="left" asChild>
      <Button className="h-auto p-2 hover:bg-white/10 " onClick={onToggle} variant="ghost">
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
