export const initialColors = [
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

export const dummyGameHistory = [
  {
    game: 1,
    sessions: [
      {
        session: 1,
        targetColor: "#FF5733",
        attempts: ["#FF0000", "#FF5733"],
        isSuccess: true
      },
      {
        session: 2,
        targetColor: "#33FF57",
        attempts: ["#000000", "#33FF57"],
        isSuccess: true
      }
    ]
  },
  {
    game: 2,
    sessions: [
      {
        session: 1,
        targetColor: "#5733FF",
        attempts: ["#123456", "#5733FF"],
        isSuccess: true
      }
    ]
  }
];
