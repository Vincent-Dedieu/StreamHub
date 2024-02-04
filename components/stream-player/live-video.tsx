"use client";

import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useTracks } from "@livekit/components-react";
import { FullScreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      wrapperRef.current?.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  const onVolumeChange = (value: number) => {
    setVolume(+value);

    if (videoRef?.current) {
      videoRef.current.muted = value === 0; // Mute video if value is 0
      videoRef.current.volume = value / 100; // Set video volume. value / 100 because <video> html element wants a value between 0 and 1
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0; // boolean. check if volume is 0
    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted; // Mute video if it's not muted, and unmute if it's muted
      videoRef.current.volume = isMuted ? 0.5 : 0; // Set video volume. 0.5 if it's muted, 0 if it's not
    }
  };

  useEffect(() => {
    onVolumeChange(0); // Mute video on mount
  }, []);

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

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
        <div className="absolute bottom-0 flex h-1/4 w-full items-center justify-end bg-transparent px-4 gap-2">
          <VolumeControl value={volume} onChange={onVolumeChange} onToggle={toggleMute} />
          <FullScreenControl isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
        </div>
      </div>
    </div>
  );
};
