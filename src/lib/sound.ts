import { Howl } from "howler";
import { useSoundStore } from "../../store";

const { isClickMuted, isMusicMuted, clickVolume, musicVolume } =
  useSoundStore.getState();

export const buttonClickSound = new Howl({
  src: ["/sounds/button-click.mp3"],
  volume: clickVolume
});

export const backgroundMusic = new Howl({
  src: ["/sounds/background-music.mp3"],
  loop: true,
  volume: musicVolume
});

export const successSound = new Howl({
  src: ["/sounds/success.wav"],
  volume: clickVolume
});

export const errorSound = new Howl({
  src: ["/sounds/error.wav"],
  volume: clickVolume
});

export const playClickSound = () => {
  if (!isClickMuted) {
    buttonClickSound.volume(clickVolume);
    buttonClickSound.play();
  }
};

export const playBackgroundMusic = () => {
  backgroundMusic.volume(musicVolume);
  if (!isMusicMuted) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
};

export const playSuccessSound = () => {
  if (!isClickMuted) {
    successSound.volume(clickVolume);
    successSound.play();
  }
};

export const playErrorSound = () => {
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
