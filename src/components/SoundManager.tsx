"use client";
import { useEffect } from "react";
import { useSoundStore } from "../../store";
import {
  playClickSound,
  backgroundMusic,
  buttonClickSound,
  successSound,
  errorSound
} from "@/lib/sound";

const SoundManager = () => {
  const { isClickMuted, isMusicMuted, clickVolume, musicVolume } =
    useSoundStore();

  useEffect(() => {
    backgroundMusic.volume(musicVolume);
    if (!isMusicMuted) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }, [isMusicMuted, musicVolume]);

  useEffect(() => {
    buttonClickSound.volume(clickVolume);
    successSound.volume(clickVolume);
    errorSound.volume(clickVolume);
  }, [clickVolume]);

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
