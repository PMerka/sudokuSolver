import { SudokuGenerator } from "./logic/SudokuGenerator";

self.onmessage = (e: MessageEvent<string>) => {
  const sudokuGenerator = new SudokuGenerator();
  if (e.data === "RUN") {
    const resp = sudokuGenerator.generatePuzzle();
    self.postMessage(resp);
  }
};
