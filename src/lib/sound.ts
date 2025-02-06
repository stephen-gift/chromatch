import { Howl } from "howler";
import { useSoundStore } from "../../store";

export const buttonClickSound = new Howl({
  src: ["/sounds/button-click.mp3"],
  volume: 0.5
});

export const backgroundMusic = new Howl({
  src: ["/sounds/background-music.mp3"],
  loop: true,
  volume: 0.4,
  onload: () => {
    console.log("Background music loaded");
  },
  onloaderror: (id, error) => {
    console.error("Background music load error:", error);
  },
  onplayerror: (id, error) => {
    console.error("Background music play error:", error);
  }
});

export const playClickSound = () => {
  const { isClickMuted } = useSoundStore.getState();
  if (!isClickMuted) {
    buttonClickSound.play();
  }
};

export const playBackgroundMusic = () => {
  const { isMusicMuted } = useSoundStore.getState();
  if (!isMusicMuted) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
};

export const initializeAudio = () => {
  const silentSound = new Howl({
    src: ["/sounds/silent.mp3"], // A very short silent audio file
    volume: 0
  });
  silentSound.play();

  playBackgroundMusic();
};
