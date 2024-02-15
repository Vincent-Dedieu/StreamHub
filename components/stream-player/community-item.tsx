"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import { Hint } from "../hint";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "../ui/button";

interface CommunityItemProps {
  participantName?: string;
  viewerName: string;
  hostName: string;
  participantIdentity: string;
}

export const CommunityItem = ({ participantName, viewerName, hostName, participantIdentity }: CommunityItemProps) => {
  return <div>{participantName}</div>;
};
