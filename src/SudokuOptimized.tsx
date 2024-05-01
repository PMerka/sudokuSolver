import "./App.css";
import { gridInput } from "./logic/gridExample";
import { SudokuGenerator } from "./logic/SudokuGenerator";

const sudokuGenerator = new SudokuGenerator();

function SudokuOptimized() {
  return (
    <>
      {JSON.stringify(sudokuGenerator.allowedValues)}

      {sudokuGenerator.allowedValues.map((row) => (
        <div style={{ display: "flex" }}>
          {row.map((values) => (
            <div style={{ width: 50, height: 50 }}>
              {JSON.stringify(values)}
            </div>
          ))}
          <button onClick={() => sudokuGenerator.startSolving()}>Sovle</button>
        </div>
      ))}
    </>
  );
}

export default SudokuOptimized;
