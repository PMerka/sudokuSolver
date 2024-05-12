export const gridExamples = [
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 6, 0, 0, 7, 8, 0],
    [5, 0, 4, 2, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 0, 2, 9, 6, 0],
    [0, 4, 0, 0, 5, 0, 0, 7, 0],
    [9, 0, 0, 0, 0, 0, 0, 0, 8],
    [0, 0, 6, 0, 7, 8, 0, 0, 1],
    [0, 9, 0, 0, 0, 0, 0, 0, 7],
    [3, 2, 0, 0, 6, 5, 0, 0, 0],
  ],
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  [
    [8, 7, 5, 9, 6, 3, 0, 0, 0],
    [0, 3, 2, 1, 0, 8, 0, 0, 0],
    [0, 6, 0, 0, 4, 0, 0, 0, 3],
    [2, 0, 0, 8, 0, 4, 6, 0, 1],
    [0, 0, 4, 0, 1, 0, 7, 0, 0],
    [7, 0, 0, 6, 3, 0, 2, 4, 8],
    [9, 1, 0, 0, 2, 7, 0, 0, 0],
    [0, 2, 0, 4, 0, 1, 0, 0, 0],
    [5, 4, 0, 0, 0, 0, 1, 2, 7],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 6, 0, 0, 7, 8, 0],
    [5, 0, 4, 2, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 0, 2, 9, 6, 0],
    [0, 4, 0, 0, 5, 0, 0, 7, 0],
    [9, 0, 0, 0, 0, 0, 0, 0, 8],
    [0, 0, 6, 0, 7, 8, 0, 0, 1],
    [0, 9, 0, 0, 0, 0, 0, 0, 7],
    [3, 2, 0, 0, 6, 5, 0, 0, 0],
  ],
];

export const getRandomSudokuGrid = () => {
  const randomIndex = Math.floor(gridExamples.length* Math.random())
  return gridExamples[randomIndex]
}