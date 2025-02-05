import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

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
          get().updateHistory(true, newAttempts);
          toast.success(
            "Correct! You guessed the right color! Let's start a new session..."
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
          toast.error(`Out of attempts! Starting a new session...`);
          setTimeout(() => get().startNewSession(), 2000);
        } else {
          set({ gameStatus: getRandomMessage(incorrectGuessMessages) });
          toast.warning("Incorrect guess! Try again.");
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

          history: [...state.history]
        }));
        toast.info("New game started!");
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
        toast.warning(`Session ${sessionNumber} deleted.`);
      },

      deleteGame: (gameNumber) => {
        set((state) => ({
          history: state.history.filter((game) => game.game !== gameNumber)
        }));
        toast.error(`Game ${gameNumber} deleted.`);
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
        toast.info("Store cleared. Starting fresh!");
      }
    }),
    {
      name: "color-game-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useColorGameStore;
