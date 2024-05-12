import "./App.css";
import { SudokuGenerator } from "./logic/SudokuGenerator";

const sudokuGenerator = new SudokuGenerator();

function SudokuOptimized() {
  const handleGenerate = () => {
    const testWorker = new Worker(new URL("./webworker.ts", import.meta.url), {
      type: "module",
    });

    testWorker.postMessage("test");
    testWorker.onmessage = (e) => {
      console.log("response", e.data);
    };
  };
}

export default SudokuOptimized;
