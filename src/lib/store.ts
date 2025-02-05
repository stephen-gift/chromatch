export const shuffleColors = (colors: string[]): string[] => {
  const shuffled = [...colors];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 6);
};

export const selectTargetColor = (colors: string[]): string =>
  colors[Math.floor(Math.random() * colors.length)];
