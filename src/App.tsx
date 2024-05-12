import "./App.css";
import Sudoku from "./SudokuRealtime";
import SudokuOptimized from "./SudokuOptimized";
import { getRandomPositions } from "./logic/SudokuGenerator";

const testWorker = new Worker(new URL("./webworker.ts", import.meta.url), {
  type: "module",
});

testWorker.postMessage("test");
testWorker.onmessage = (e) => {
  console.log("response", e.data);
};

function App() {
  console.log(getRandomPositions());
  return (
    <div>
      <Sudoku />
      <SudokuOptimized />
    </div>
  );
}

export default App;
