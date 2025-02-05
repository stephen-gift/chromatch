"use client";
import React, { useEffect } from "react";
import { useSoundStore } from "../../store";
import { backgroundMusic } from "@/lib/sound";

const SoundManager = () => {
  const { isMuted, toggleMute } = useSoundStore();

  useEffect(() => {
    if (!isMuted) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }, [isMuted]);

  return <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>;
};

export default SoundManager;
