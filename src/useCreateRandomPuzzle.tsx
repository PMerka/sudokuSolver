import { useState } from "react";

const testWorker = new Worker(new URL("./webworker.ts", import.meta.url), {
  type: "module",
});

function useCreateRandomPuzzle(callback: (e: any) => void) {
  const [loading, setLoading] = useState(false);
  const handleGenerate = () => {
    testWorker.postMessage("RUN");
    setLoading(true);
    testWorker.onmessage = (e) => {
      callback(e.data);
      setLoading(false);
    };
  };

  return [loading, handleGenerate] as const;
}

export default useCreateRandomPuzzle;
