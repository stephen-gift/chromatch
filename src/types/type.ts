export interface GameSession {
  session: number;
  attempts: string[];
  targetColor: string;
  isSuccess: boolean;
}

export interface GameHistory {
  game: number;
  sessions: GameSession[];
  isExpanded: boolean;
}

export interface CurrentSession {
  session: number;
  attempts: string[];
  isSuccess: boolean;
}
export interface GameState {
  colors: string[];
  targetColor: string | null;
  score: number;
  gameStatus: string;
  isRevealed: boolean;
  showModal: boolean;
  tries: string[];
  sessionCount: number;
  gameCount: number;
  gameHistory: GameHistory[];
  currentSession: CurrentSession | null;
  startNewRound: () => void;
  handleGuess: (color: string) => void;
  startNewGame: () => void;
  toggleGameExpansion: (gameNumber: number) => void;
  clearAllData: () => void;
  deleteGame: (gameNumber: number) => void;
  deleteSession: (gameNumber: number, sessionNumber: number) => void;
}
