import { useRef } from "react";
import Cell from "../Cell/Cell";

export default function Grid({
  gridState,
  activeCoordinate,
  updateGrid,
}: {
  gridState: number[][];
  activeCoordinate: { x: number | null; y: number | null };
  updateGrid: (yIndex: number, xIndex: number, value: string) => void;
}) {
  const gridSize = gridState.length * gridState[0].length;
  const cellRefs = useRef<HTMLInputElement[]>([]); // array of all cell refs
  const focusedRef = useRef(0); // index of focused input in
  console.log(gridSize);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.includes("Arrow")) e.preventDefault();
    if (e.key === "ArrowDown" && focusedRef.current + 9 < gridSize) {
      focusedRef.current += 9;
    }
    if (e.key === "ArrowUp" && focusedRef.current - 9 > 0) {
      focusedRef.current -= 9;
    }
    if (e.key === "ArrowRight" && focusedRef.current + 1 < gridSize) {
      focusedRef.current += 1;
    }
    if (e.key === "ArrowLeft" && focusedRef.current - 1 > 0) {
      focusedRef.current -= 1;
    }
    cellRefs.current[focusedRef.current].focus();
  };

  return (
    <div>
      {gridState.map((row, yIndex) => (
        <div className="row" key={yIndex}>
          {row.map((number, xIndex) => (
            <Cell
              onKeyDown={(e) => keyDownHandler(e)}
              updatePosition={() => (focusedRef.current = xIndex + 9 * yIndex)}
              cellRef={cellRefs}
              position={{ xIndex, yIndex }}
              key={xIndex}
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
    </div>
  );
}
