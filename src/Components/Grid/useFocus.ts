import { useRef } from "react";

export const useGridFocus = (gridSize: number) => {
    const cellRefs = useRef<HTMLInputElement[]>([]); // array of all cell refs
    const focusedRef = useRef(0); // index of focused input in

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.includes("Arrow")) e.preventDefault();
        if (e.key === "ArrowDown" && focusedRef.current + 9 < gridSize) {
          focusedRef.current += 9;
        }
        if (e.key === "ArrowUp" && focusedRef.current - 9 >= 0) {
          focusedRef.current -= 9;
        }
        if (e.key === "ArrowRight" && focusedRef.current + 1 < gridSize) {
          focusedRef.current += 1;
        }
        if (e.key === "ArrowLeft" && focusedRef.current - 1 >= 0) {
          focusedRef.current -= 1;
        }
        cellRefs.current[focusedRef.current].focus();
      };

      return [cellRefs, focusedRef, keyDownHandler] as const
}