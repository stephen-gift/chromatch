"use client";
import { useEffect } from "react";
import { useSoundStore } from "../../store";
import { playClickSound, backgroundMusic } from "@/lib/sound";

const SoundManager = () => {
  const { isClickMuted, isMusicMuted } = useSoundStore();

  useEffect(() => {
    if (!isMusicMuted) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }, [isMusicMuted]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.tagName === "BUTTON" || target.closest("button")) {
        if (!isClickMuted) {
          playClickSound();
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isClickMuted]);

  return null;
};

export default SoundManager;
