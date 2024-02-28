"use client";

import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Hint } from "../hint";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

export const VolumeControl = ({ onToggle, onChange, value }: VolumeControlProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;
  let Icon = isMuted ? VolumeX : isAboveHalf ? Volume2 : Volume1;
  const label = isMuted ? "Unmute" : "Mute";

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button className="text-white hover:bg-white/10 p-1.5 rounded-lg" onClick={onToggle}>
          <Icon className="w-6 h-6" />
        </button>
      </Hint>
      <Slider className="w-32 cursor-pointer" value={[value]} onValueChange={handleChange} max={100} step={1} />
    </div>
  );
};
