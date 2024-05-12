import { SudokuGrid } from "./SudokuGridClass";

/**
 * Helper function returns random all positions 
 * in sudoku grid {x, y} in array in random order
 */
export const getRandomPositions = () => {
    const positions = []
    for(let y = 0; y < 9; y += 1){
        for(let x = 0; x < 9; x += 1){
            positions.push({x, y})
        }
    }
    const randomPositions =  positions.sort(
        () => Math.random() - 0.5
    )
    return randomPositions
}


export class SudokuGenerator extends SudokuGrid {
  updateGridReactState: {
    (x: number, y: number, grid: number[][]): void;
  } | null;
  delay: number;
  running: boolean;
  allowedValues: number[][][];
  numberOfSolutions: number;
  checkIfIsUnique: boolean;

  constructor() {
    super();
    this.updateGridReactState = null;
    this.delay = 0;
    this.running = false;
    this.allowedValues = this.getAllowedValues();
    this.numberOfSolutions = 0;
    this.checkIfIsUnique = false; // sets if algorithm should check if solution is unique
  }

  setGrid = (grid: number[][]) => {
    this.grid = grid;
    this.allowedValues = this.getAllowedValues();
  };

  randomizeOrderOfAllowedValues = () => {
    this.cleanGrid();
    for (let y = 0; y < 9; y += 1) {
      for (let x = 0; x < 9; x += 1) {
        this.allowedValues[y][x] = this.allowedValues[y][x].sort(
          () => Math.random() - 0.5
        );
      }
    }
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

  solveSudokuRecursion = () => {
    const emptyPlace = this.findEmpty();
    if (!emptyPlace) {
      if (this.checkIfIsUnique && this.numberOfSolutions < 2) {
        this.numberOfSolutions += 1;
        return false;
      }
      return true;
    }

    const allowedValues = this.allowedValues[emptyPlace.y][emptyPlace.x];

    for (const testNumber of allowedValues) {
      const isTestNumberValid = this.isValidNumber({
        testX: emptyPlace.x,
        testY: emptyPlace.y,
        testValue: testNumber,
      });
      if (isTestNumberValid) {
        this.grid[emptyPlace.y][emptyPlace.x] = testNumber;
        if (this.updateGridReactState !== null) {
          this.updateGridReactState(emptyPlace.x, emptyPlace.y, this.grid);
        }
        const nextIterationIsValid = this.solveSudokuRecursion();
        if (nextIterationIsValid) {
          return true;
        }
        this.grid[emptyPlace.y][emptyPlace.x] = 0;
      }
    }
    return false;
  };

  generatePuzzle = () => {
      this.checkIfIsUnique = false;
      this.numberOfSolutions = 0;
      this.getAllowedValues();
      this.randomizeOrderOfAllowedValues();
      console.log("array generated", JSON.stringify(this.grid));
      this.solveSudokuRecursion();
      console.log(this.grid);

     const randomPositions = getRandomPositions()

     for(const position of randomPositions){
        this.numberOfSolutions = 0;
        this.getAllowedValues();
        const backup = structuredClone(this.grid);
        this.grid[position.y][position.x] = 0
        this.checkIfIsUnique = true;
        this.solveSudokuRecursion();
        this.grid = structuredClone(backup)
        if(this.numberOfSolutions === 1){
            this.grid[position.y][position.x] = 0
        }
        console.log(this.grid)
     }

     console.log('FINAL', this.grid)
     return this.grid
  };
}
