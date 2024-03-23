import { useState } from "react";
import "./App.css";
import { solveSudoku, setRunning, setDelay } from "./logic/sudoku";
import { gridInput } from "./logic/gridExample";
import Cell from "./Cell";

function App() {
  const [gridState, setGridState] = useState(structuredClone(gridInput));
  const [activeCoordinate, setActiveCoordinate] = useState<{
    x: null | number;
    y: null | number;
  }>({ x: null, y: null });

  const handleSetGrid = (grid: number[][], x: number, y: number) => {
    setActiveCoordinate({ x, y });
    setGridState(structuredClone(grid));
  };

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
    setGridState(newGrid);
  };

  const solve = () => {
    setRunning(true);
    solveSudoku(gridState, handleSetGrid);
  };

  const stopSolving = () => {
    setRunning(false);
  };

  return (
    <>
      {gridState.map((row, yIndex) => (
        <div className="row">
          {row.map((number, xIndex) => (
            <Cell
              active={
                yIndex === activeCoordinate.y && xIndex === activeCoordinate.x
              }
              number={number}
              handleSetGrid={(value: string) =>
                updateGrid(yIndex, xIndex, value)
              }
            />
          ))}
        </div>
      ))}

      <button onClick={() => solve()}>Start solving</button>

      <button onClick={() => stopSolving()}>STOP</button>

      <button
        onClick={() => {
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
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </div>
    </>
  );
}

export default App;
