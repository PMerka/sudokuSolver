import { SudokuGrid } from "./SudokuGridClass";
export class SudokuSolverRealTime extends SudokuGrid {
  onGridUpdate: { (x: number, y: number, grid: number[][]): void } | null;
  delay: number;
  running: boolean;
  isStartingValue: boolean[][];

  constructor() {
    super();
    this.onGridUpdate = null;
    this.delay = 0;
    this.running = false;
    this.isStartingValue = this.grid.map((row) => row.map(() => false));
  }

  setUpdateGridReactState = (
    updateGridState: (x: number, y: number, value: number[][]) => void
  ) => {
    this.onGridUpdate = updateGridState;
  };

    //get all values possible in empty places in grid and save them for the use in solveSudokuRecursion
    getAllowedValues = () => {
      const allowedValues = this.grid.map((row, y) =>
        row.map((value, x) => {
          if (value !== 0) {
            return [];
          }
          const allowedNumbers = [];
          for (let number = 1; number < 10; number += 1) {
            if (this.isValidNumber({ testX: x, testY: y, testValue: number })) {
              allowedNumbers.push(number);
            }
          }
          return allowedNumbers;
        })
      );
  
      return allowedValues;
    };

  setEntry = (newGrid: number[][]) => {
    this.grid = newGrid;
    this.isStartingValue = newGrid.map((row) =>
      row.map((value) => {
        if (value === 0) {
          return false;
        } else {
          return true;
        }
      })
    );
  };

  startSolving = async () => {
    console.log(this.grid);
    if(this.running){
        return
    }
    this.running = true;
    const originalGrid = structuredClone(this.grid);
    const start = performance.now();
    const result = await this.solveSudokuRecursion();
    const end = performance.now();
    console.log("it takes", end - start);
    console.log(this.grid);
    if (!result) {
      this.grid = originalGrid;
    }
    this.running = false
  };

  solveSudokuRecursion = async () => {
    if (!this.running) return;
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    const emptyPlace = this.findEmpty();
    if (!emptyPlace) {
      return true;
    }

    for (let testNumber = 1; testNumber < 10; testNumber += 1) {
      const isTestNumberValid = this.isValidNumber({
        testX: emptyPlace.x,
        testY: emptyPlace.y,
        testValue: testNumber,
      });
      if (isTestNumberValid) {
        this.grid[emptyPlace.y][emptyPlace.x] = testNumber;
        if (this.onGridUpdate !== null) {
          this.onGridUpdate(emptyPlace.x, emptyPlace.y, this.grid);
        }
        const nextIterationIsValid = await this.solveSudokuRecursion();
        if (nextIterationIsValid) {
          return true;
        }
        this.grid[emptyPlace.y][emptyPlace.x] = 0;
      }
    }
    return false;
  };
}
