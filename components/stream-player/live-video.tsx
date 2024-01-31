"use client";

import { Participant, Track } from "livekit-client";
import { useRef } from "react";
import { useTracks } from "@livekit/components-react";
import { FullScreenControl } from "./fullscreen-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div className="relative h-full flex" ref={wrapperRef}>
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute  flex bottom-0 left-96 w-full items-center justify-between bg-transparent px-4">
          <FullScreenControl isFullscreen={false} onToggle={() => {}} />
        </div>
      </div>
    </div>
  );
};
