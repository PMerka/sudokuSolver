import { useEffect, useState } from "react";
import "./App.css";
import { SudokuSolverRealTime } from "./logic/SudokuSolverRealTime";
import Grid from "./Components/Grid/Grid";
import { gridInput } from "./logic/gridExample";

const sudokuInstance = new SudokuSolverRealTime();

function Sudoku() {
  const [gridState, setGridState] = useState(
    structuredClone(sudokuInstance.grid)
  );
  const [activeCoordinate, setActiveCoordinate] = useState<{
    x: null | number;
    y: null | number;
  }>({ x: null, y: null });

  const updateGridState = (x: number, y: number, value: number[][]) => {
    setActiveCoordinate({ x, y });
    setGridState(value);
  };

  useEffect(() => {
    sudokuInstance.setUpdateGridReactState(updateGridState);
  }, []);

  const updateGrid = (yIndex: number, xIndex: number, value: string) => {
    let number = Number(value);
    if (isNaN(number)) {
      return;
    }
    if (number < 0) {
      number = 0;
    }
    if (number > 9) {
      number = 9;
    }

    const newGrid = structuredClone(gridState);
    newGrid[yIndex][xIndex] = number;
    sudokuInstance.grid = newGrid;
    setGridState(newGrid);
  };

  const solve = () => {
    console.log(sudokuInstance.grid);
    sudokuInstance.running = true;
    sudokuInstance.solveSudokuRecursion();
  };

  return (
    <>
      <Grid
        gridState={gridState}
        activeCoordinate={activeCoordinate}
        updateGrid={updateGrid}
      />

      <button onClick={() => solve()}>Start solving</button>

      <button
        onClick={() => {
          sudokuInstance.grid = structuredClone(gridInput);
          setGridState(gridInput);
        }}
      >
        RESET
      </button>
      <div>
        <input
          type="range"
          min={1}
          max={500}
          onChange={(e) => (sudokuInstance.delay = Number(e.target.value))}
        />
      </div>
    </>
  );
}

export default Sudoku;
