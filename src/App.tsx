import { useState } from "react";
import "./App.css";
import { gridInput, solveSudoku } from "./logic/sudoku";
import { grid } from "./logic/sudoku";

function App() {
  const [gridState, setGridState] = useState(structuredClone(grid));
  const [activeCoordinate, setActiveCordinate] = useState<{
    x: null | number;
    y: null | number;
  }>({ x: null, y: null });

  const handleSetGrid = (grid: number[][], x: number, y: number) => {
    setActiveCordinate({ x, y });
    setGridState(structuredClone(grid));
  };

  return (
    <>
      {gridState.map((row, yIndex) => (
        <div className="row">
          {row.map((number, xIndex) => (
            <div
              className="cell"
              style={
                yIndex === activeCoordinate.y && xIndex === activeCoordinate.x
                  ? { background: "red" }
                  : {}
              }
            >
              {number !== 0 && number}
            </div>
          ))}
        </div>
      ))}

      <button onClick={() => solveSudoku(grid, handleSetGrid)}>
        Start solving
      </button>

      <button onClick={() => solveSudoku(grid, handleSetGrid)}>RESET</button>

      <button
        onClick={() => {
          setGridState(gridInput);
        }}
      >
        RESET
      </button>
    </>
  );
}

export default App;
