export const gridInput = [
  [2, 5, 0, 0, 3, 0, 9, 0, 1],
  [0, 1, 0, 0, 0, 4, 0, 0, 0],
  [4, 0, 7, 0, 0, 0, 2, 0, 8],
  [0, 0, 5, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 9, 8, 1, 0, 0],
  [0, 4, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 3, 6, 0, 0, 7, 2],
  [0, 7, 0, 0, 0, 0, 0, 0, 3],
  [9, 0, 3, 0, 0, 0, 6, 0, 4],
];

export const grid = [
  [0, 0, 0, 0, 0, 0, 9, 0, 1],
  [0, 1, 0, 0, 0, 4, 0, 0, 0],
  [4, 0, 7, 0, 0, 0, 2, 0, 8],
  [0, 0, 5, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 9, 8, 1, 0, 0],
  [0, 4, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 3, 6, 0, 0, 7, 2],
  [0, 7, 0, 0, 0, 0, 0, 0, 3],
  [9, 0, 3, 0, 0, 0, 6, 0, 4],
];

export const isValidNumber = ({
  grid,
  xPosition,
  yPosition,
  number,
}: {
  grid: number[][];
  xPosition: number;
  yPosition: number;
  number: number;
}) => {
  const target = grid[yPosition][xPosition];

  if (target !== 0) {
    return Error("Not empty");
  }

  //check row
  const activeRow = grid[yPosition];
  const rowIncludes = activeRow.includes(number);
  if (rowIncludes) {
    return false;
  }

  //check column
  const activeColumn = grid.map((row) => row[xPosition]);
  const columnIncludes = activeColumn.includes(number);
  if (columnIncludes) {
    return false;
  }

  //check square
  const xStartSquare = 3 * Math.floor(xPosition / 3);
  const yStartSquare = 3 * Math.floor(yPosition / 3);

  for (let y = yStartSquare; y < yStartSquare + 3; y += 1) {
    for (let x = xStartSquare; x < xStartSquare + 3; x += 1) {
      if (grid[y][x] === number) {
        return false;
      }
    }
  }

  return true;
};

export const findEmpty = (grid: number[][]) => {
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid.length; x += 1) {
      if (grid[y][x] === 0) {
        return { x, y };
      }
    }
  }
  return null;
};

const solveSudokuRecursion = async (
  grid: number[][],
  setGridState: (grid: number[][], x: number, y: number) => void
) => {
  await new Promise((resolve) => setTimeout(resolve, 1));

  const emptyPlace = findEmpty(grid);
  if (!emptyPlace) {
    console.log("final grid", grid);
    return true;
  }

  for (let testNumber = 1; testNumber < 10; testNumber += 1) {
    const isTestNumberValid = isValidNumber({
      grid,
      xPosition: emptyPlace.x,
      yPosition: emptyPlace.y,
      number: testNumber,
    });
    console.log(grid);
    if (isTestNumberValid) {
      console.log("valid");
      grid[emptyPlace.y][emptyPlace.x] = testNumber;
      setGridState(grid, emptyPlace.x, emptyPlace.y);
      console.log("new grid", emptyPlace.y, emptyPlace.x, testNumber, grid);
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
