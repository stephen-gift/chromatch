import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { playErrorSound, playSuccessSound } from "@/lib/sound";

interface GameSession {
  session: number;
  targetColor: string;
  attempts: string[];
  isSuccess: boolean;
}

interface GameHistory {
  game: number;
  sessions: GameSession[];
}

interface ColorGameState {
  colors: string[];
  targetColor: string;
  score: number;
  gameStatus: string;
  isRevealed: boolean;
  attempts: string[];
  session: number;
  game: number;
  history: GameHistory[];
  maxAttempts: number;
  showConfetti: boolean;
  showHint: boolean;
  hintUsedInSession: number;
  setShowHint: (show: boolean) => void;
  setHintUsedInSession: (session: number) => void;
  activateHint: () => void;
  setShowConfetti: (show: boolean) => void;
  setTargetColor: (color: string) => void;
  setScore: (score: number) => void;
  setGameStatus: (status: string) => void;
  setIsRevealed: (revealed: boolean) => void;
  setAttempts: (attempts: string[]) => void;
  setSession: (session: number) => void;
  setGame: (game: number) => void;
  setHistory: (history: GameHistory[]) => void;
  handleGuess: (color: string) => void;
  startNewSession: () => void;
  startNewGame: () => void;
  deleteSession: (gameNumber: number, sessionNumber: number) => void;
  deleteGame: (gameNumber: number) => void;
  clearStore: () => void;
  updateHistory: (isSuccess: boolean, attempts: string[]) => void;
}

const startMessages = [
  "Let's Begin! Guess the Color!",
  "New Session! What's the Target Color?",
  "Ready to Play? Make Your First Guess!"
];

const incorrectGuessMessages = [
  "Oops! That’s Not It! Try Again!",
  "Not Quite! Try Again!",
  "Almost There! Guess Again!",
  "So Close! Guess Again!"
];

const correctGuessMessages = [
  "Correct! You Guessed It!",
  "Nice Job! You Guessed It!",
  "Awesome! You Found the Right Color!",
  "Well Done! You Nailed It!"
];

const outOfAttemptsMessages = [
  "Out of Attempts! Try Again Next Time!",
  "No More Chances! Try Again Next Time!",
  "Game Over for This Round!",
  "Better Luck Next Time!"
];

function getRandomMessage(messages: string[]) {
  return messages[Math.floor(Math.random() * messages.length)];
}

const initialColors = [
  "#FF6B6B",
  "#1E90FF",
  "#2ECC71",
  "#F39C12",
  "#8E44AD",
  "#E74C3C",
  "#9B59B6",
  "#3498DB",
  "#16A085",
  "#27AE60",
  "#F1C40F",
  "#D35400"
];

const shuffleColors = (colors: string[]) => {
  const shuffled = [...colors];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const selectedColors = shuffled.slice(0, 6);

  return selectedColors;
};

const initialShuffled = shuffleColors(initialColors);

const useColorGameStore = create<ColorGameState>()(
  persist(
    (set, get) => ({
      colors: initialShuffled,
      targetColor:
        initialShuffled[Math.floor(Math.random() * initialShuffled.length)],
      score: 0,
      gameStatus: "Make a Guess!",
      isRevealed: false,
      attempts: [],
      session: 1,
      game: 1,
      history: [],
      maxAttempts: 4,
      showConfetti: false,
      showHint: false,
      hintUsedInSession: 0,

      setShowConfetti: (show) => set({ showConfetti: show }),
      setTargetColor: (color) => set({ targetColor: color }),
      setScore: (score) => set({ score }),
      setGameStatus: (status) => set({ gameStatus: status }),
      setIsRevealed: (revealed) => set({ isRevealed: revealed }),
      setAttempts: (attempts) => set({ attempts }),
      setSession: (session) => set({ session }),
      setGame: (game) => set({ game }),
      setHistory: (history) => set({ history }),

      handleGuess: (color) => {
        const { attempts, maxAttempts, targetColor } = get();
        const newAttempts = [...attempts, color];
        set({ attempts: newAttempts });

        if (color === targetColor) {
          set({
            isRevealed: true,
            score: get().score + 1,
            showConfetti: true,
            gameStatus: getRandomMessage(correctGuessMessages)
          });
          playSuccessSound();
          get().updateHistory(true, newAttempts);
          toast.success(
            "Correct! You guessed the right color! Let's start a new session...",
            {
              duration: 4000,
              position: "top-right",
              dismissible: true,
              style: {
                background: "#22C55E",
                color: "#FFF",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
              },
              classNames: {
                toast:
                  "bg-green-500 text-white font-semibold px-4 py-3 rounded-lg shadow-lg",
                title: "text-lg font-bold",
                description: "text-sm text-gray-100",
                closeButton: "text-white hover:text-gray-300"
              }
            }
          );

          setTimeout(() => {
            get().startNewSession();
          }, 2000);
        } else if (newAttempts.length >= maxAttempts) {
          get().updateHistory(false, newAttempts);
          set({
            gameStatus: getRandomMessage(outOfAttemptsMessages).replace(
              "[color]",
              targetColor
            )
          });
          playErrorSound();
          toast.error("Out of attempts! Starting a new session...", {
            duration: 5000,
            position: "top-right",
            dismissible: true,
            style: {
              background: "#FF4D4D",
              color: "#FFF",
              fontWeight: "normal",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            },
            classNames: {
              toast:
                "bg-red-600 text-white font-semibold px-4 py-3 rounded-lg shadow-lg",
              title: "text-lg font-bold",
              description: "text-sm text-gray-100",
              closeButton: "text-white hover:text-gray-300"
            }
          });
          setTimeout(() => get().startNewSession(), 2000);
        } else {
          set({ gameStatus: getRandomMessage(incorrectGuessMessages) });
          toast.warning("Incorrect guess! Try again.", {
            duration: 4000,
            position: "top-right",
            dismissible: true,
            style: {
              background: "#FFA500",
              color: "#FFF",
              fontWeight: "normal",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            },
            classNames: {
              toast:
                "bg-orange-500 text-white font-semibold px-4 py-3 rounded-lg shadow-lg",
              title: "text-lg font-bold",
              description: "text-sm text-gray-100",
              closeButton: "text-white hover:text-gray-300"
            }
          });
        }
      },

      updateHistory: (isSuccess, attempts) => {
        const { history, game, session, targetColor } = get();
        const newHistory = [...history];
        const gameIndex = newHistory.findIndex((g) => g.game === game);

        if (gameIndex === -1) {
          newHistory.push({
            game,
            sessions: [{ session, targetColor, attempts, isSuccess }]
          });
        } else {
          const sessionIndex = newHistory[gameIndex].sessions.findIndex(
            (s) => s.session === session
          );
          if (sessionIndex === -1) {
            newHistory[gameIndex].sessions.push({
              session,
              targetColor,
              attempts,
              isSuccess
            });
          } else {
            newHistory[gameIndex].sessions[sessionIndex] = {
              session,
              targetColor,
              attempts,
              isSuccess
            };
          }
        }
        set({ history: newHistory });
      },

      startNewSession: () => {
        const newColors = shuffleColors(initialColors);

        set((state) => ({
          colors: newColors,
          targetColor: newColors[Math.floor(Math.random() * newColors.length)],
          session: state.session + 1,
          gameStatus: getRandomMessage(startMessages),
          isRevealed: false,
          attempts: []
        }));
      },

      startNewGame: () => {
        const newColors = shuffleColors(initialColors);

        set((state) => ({
          colors: newColors,
          targetColor: newColors[Math.floor(Math.random() * newColors.length)],
          game: state.game + 1,
          session: 1,
          score: 0,
          gameStatus: getRandomMessage(startMessages),
          isRevealed: false,
          attempts: [],
          hintUsedInSession: 0,

          history: [...state.history]
        }));
        toast.info("New game started!", {
          duration: 4000,
          position: "top-right",
          dismissible: true,
          style: {
            background: "#3B82F6",
            color: "#FFF",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          },
          classNames: {
            toast:
              "bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg shadow-lg",
            title: "text-lg font-bold",
            description: "text-sm text-gray-100",
            closeButton: "text-white hover:text-gray-300"
          }
        });
      },

      deleteSession: (gameNumber, sessionNumber) => {
        set((state) => ({
          history: state.history.map((game) => {
            if (game.game === gameNumber) {
              return {
                ...game,
                sessions: game.sessions.filter(
                  (session) => session.session !== sessionNumber
                )
              };
            }
            return game;
          })
        }));
        toast.warning(`Session ${sessionNumber} deleted.`, {
          duration: 4000,
          position: "top-right",
          dismissible: true,
          style: {
            background: "#F59E0B",
            color: "#FFF",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          },
          classNames: {
            toast:
              "bg-yellow-500 text-white font-semibold px-4 py-3 rounded-lg shadow-lg",
            title: "text-lg font-bold",
            description: "text-sm text-gray-100",
            closeButton: "text-white hover:text-gray-300"
          }
        });
      },

      deleteGame: (gameNumber) => {
        set((state) => ({
          history: state.history.filter((game) => game.game !== gameNumber)
        }));
        toast.error(`Game ${gameNumber} deleted.`, {
          duration: 4000,
          position: "top-right",
          dismissible: true,
          style: {
            background: "#DC2626",
            color: "#FFF",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          },
          classNames: {
            toast:
              "bg-red-600 text-white font-semibold px-4 py-3 rounded-lg shadow-lg",
            title: "text-lg font-bold",
            description: "text-sm text-gray-100",
            closeButton: "text-white hover:text-gray-300"
          }
        });
      },

      clearStore: () => {
        const newColors = shuffleColors(initialColors);
        set({
          colors: newColors,
          targetColor: newColors[Math.floor(Math.random() * newColors.length)],
          score: 0,
          gameStatus: getRandomMessage(startMessages),
          isRevealed: false,
          attempts: [],
          session: 1,
          game: 1,
          history: []
        });
        toast.info("Store cleared. Starting fresh!", {
          duration: 4000,
          position: "top-right",
          dismissible: true,
          style: {
            background: "#3B82F6",
            color: "#FFF",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          },
          classNames: {
            toast:
              "bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg shadow-lg",
            title: "text-lg font-bold",
            description: "text-sm text-gray-100",
            closeButton: "text-white hover:text-gray-300"
          }
        });
      },
      setShowHint: (show) => set({ showHint: show }),
      setHintUsedInSession: (session) => set({ hintUsedInSession: session }),

      activateHint: () => {
        const { session, hintUsedInSession } = get();

        const nextAvailableSession = hintUsedInSession + 3;

        if (session - hintUsedInSession >= 3) {
          set({ showHint: true, hintUsedInSession: session });

          setTimeout(() => {
            set({ showHint: false });
          }, 2000);
        } else {
          toast.warning(
            `Hint can only be used once every 2 sessions! Next available in session ${nextAvailableSession}.`,
            {
              duration: 4000,
              position: "top-right",
              dismissible: true,
              style: {
                background: "#F59E0B",
                color: "#FFF",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
              },
              classNames: {
                toast:
                  "bg-yellow-500 text-white font-semibold px-4 py-3 rounded-lg shadow-lg",
                title: "text-lg font-bold",
                description: "text-sm text-gray-100",
                closeButton: "text-white hover:text-gray-300"
              }
            }
          );
        }
      }
    }),
    {
      name: "color-game-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useColorGameStore;

interface SoundState {
  isMusicMuted: boolean;
  isClickMuted: boolean;
  toggleMusicMute: () => void;
  toggleClickMute: () => void;
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      isMusicMuted: false,
      isClickMuted: false,
      toggleMusicMute: () =>
        set((state) => ({ isMusicMuted: !state.isMusicMuted })),
      toggleClickMute: () =>
        set((state) => ({ isClickMuted: !state.isClickMuted }))
    }),
    {
      name: "sound-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
