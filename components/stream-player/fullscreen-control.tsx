"use client";
import { Maximize, Minimize } from "lucide-react";

import { Hint } from "../hint";

export interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export const FullScreenControl = ({ isFullscreen, onToggle }: FullscreenControlProps) => {
  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button className="text-white transform hover:scale-125 transition-transform duration-200" onClick={onToggle}>
          <Icon className="w-6 h-6" />
        </button>
      </Hint>
    </div>
  );
};
