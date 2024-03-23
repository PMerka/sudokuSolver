import { isValidNumber } from "./isValidNumber";
import { findEmpty } from "./findEmpty";


//Global variable used for termination of solveSudokuRecursion function
let running = false

export const setRunning = (value: boolean) => {
  running = value
  return value
}

let delay = 10

export const setDelay = (value: number) => {
  delay = value
}

const solveSudokuRecursion = async (
  grid: number[][],
  setGridState: (grid: number[][], x: number, y: number) => void
) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const emptyPlace = findEmpty(grid);
  if (!emptyPlace) {
    return true;
  }

  for (let testNumber = 1; testNumber < 10; testNumber += 1) {
    const isTestNumberValid = isValidNumber({
      grid,
      xPosition: emptyPlace.x,
      yPosition: emptyPlace.y,
      number: testNumber,
    });
    if(!running){
      return
    }
    if (isTestNumberValid) {
      grid[emptyPlace.y][emptyPlace.x] = testNumber;
      setGridState(grid, emptyPlace.x, emptyPlace.y);
      if (await solveSudokuRecursion(grid, setGridState)) {
        return true;
      }
      grid[emptyPlace.y][emptyPlace.x] = 0;
    }
  }
  return false;
};

export const solveSudoku = (
  initGrid: number[][],
  setGridState: (grid: number[][], x: number, y: number) => void
) => {
  const grid = structuredClone(initGrid);
  solveSudokuRecursion(grid, setGridState);
};