import { useEffect, useState } from "react";
import "./App.css";
import { SudokuSolverRealTime } from "./logic/SudokuSolverRealTime";
import Grid from "./Components/Grid/Grid";
import { getRandomSudokuGrid, gridExamples } from "./logic/gridExamples";
import styles from "./SudokuRealtime.module.css";
import useCreateRandomPuzzle from "./useCreateRandomPuzzle";

const sudokuInstance = new SudokuSolverRealTime();
sudokuInstance.setEntry(structuredClone(gridExamples[0]));

function Sudoku() {
  const [gridState, setGridState] = useState(
    structuredClone(sudokuInstance.grid)
  );

  const [gridInitPositions, setGridInitPositions] = useState(
    structuredClone(sudokuInstance.isStartingValue)
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
    sudokuInstance.onGridUpdate = (x, y, value) => updateGridState(x, y, value);
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
    sudokuInstance.setEntry(newGrid);
    setGridInitPositions(sudokuInstance.isStartingValue);
    setGridState(newGrid);
  };

  const solve = async () => {
    await sudokuInstance.startSolving();
    setActiveCoordinate({ x: null, y: null });
  };

  const randomGrid = () => {
    const grid = getRandomSudokuGrid();
    setGridState(grid);
  };

  const [workerLoading, getRandomGridWorker] = useCreateRandomPuzzle((data) => {
    sudokuInstance.setEntry(structuredClone(data));
    setGridState(data);
    setGridInitPositions(sudokuInstance.isStartingValue);
    setGridState(data);
  });

  return (
    <div className={styles.main}>
      <Grid
        gridInitPositions={gridInitPositions}
        gridState={gridState}
        activeCoordinate={activeCoordinate}
        updateGrid={updateGrid}
      />

      <div>
        <button onClick={() => getRandomGridWorker()}>
          RANDOM GRID {workerLoading ? "Loading..." : ""}{" "}
        </button>

        <button onClick={() => solve()}>Start solving</button>

        <button
          onClick={() => {
            const g = getRandomSudokuGrid();
            console.log(g);
            setGridState(g);
            sudokuInstance.setEntry(g);
          }}
        >
          RESET
        </button>

        <input
          type="range"
          min={1}
          max={500}
          onChange={(e) => (sudokuInstance.delay = Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Sudoku;
