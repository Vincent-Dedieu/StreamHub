"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";

export const ChatToggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSidebar((state) => state);

  const label = collapsed ? "Expand chat" : "Collapse chat";

  let Icon = collapsed ? ArrowRightFromLine : ArrowLeftFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  return (
    <Hint label={label} side="left" asChild>
      <Button className="h-auto p-2 hover:bg-white/10 " onClick={onToggle} variant="ghost">
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
