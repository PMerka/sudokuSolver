import "./App.css";
import Sudoku from "./Sudoku";
import SudokuOptimized from "./SudokuOptimized";
import { SudokuGenerator } from "./logic/SudokuGenerator";
import { gridInput } from "./logic/gridExample";
import { getRandomPositions } from "./logic/SudokuGenerator";

function App() {
  console.log(getRandomPositions());
  return (
    <>
      <Sudoku />
      <SudokuOptimized />
    </>
  );
}

export default App;
