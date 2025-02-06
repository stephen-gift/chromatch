import { Howl } from "howler";
import { useSoundStore } from "../../store";

export const buttonClickSound = new Howl({
  src: ["/sounds/button-click.mp3"],
  volume: 0.3
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

export const successSound = new Howl({
  src: ["/sounds/success.wav"],
  volume: 0.2
});

export const errorSound = new Howl({
  src: ["/sounds/error.wav"],
  volume: 0.2
});

export const playClickSound = () => {
  const { isClickMuted, clickVolume } = useSoundStore.getState();
  if (!isClickMuted) {
    buttonClickSound.volume(clickVolume);
    buttonClickSound.play();
  }
};

export const playBackgroundMusic = () => {
  const { isMusicMuted, musicVolume } = useSoundStore.getState();
  backgroundMusic.volume(musicVolume);
  if (!isMusicMuted) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
};

export const playSuccessSound = () => {
  const { isClickMuted, clickVolume } = useSoundStore.getState();
  if (!isClickMuted) {
    successSound.volume(clickVolume);
    successSound.play();
  }
};

export const playErrorSound = () => {
  const { isClickMuted, clickVolume } = useSoundStore.getState();
  if (!isClickMuted) {
    errorSound.volume(clickVolume);
    errorSound.play();
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
