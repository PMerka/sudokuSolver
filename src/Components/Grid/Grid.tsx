import Cell from "../Cell/Cell";
import styles from "./Grid.module.css";
import { useGridFocus } from "./useFocus";

export default function Grid({
  gridInitPositions,
  gridState,
  activeCoordinate,
  updateGrid,
}: {
  gridInitPositions: boolean[][];
  gridState: number[][];
  activeCoordinate: { x: number | null; y: number | null };
  updateGrid: (yIndex: number, xIndex: number, value: string) => void;
}) {
  const gridSize = gridState.length * gridState[0].length;

  const [cellRefs, focusedRef, keyDownHandler] = useGridFocus(gridSize);

  return (
    <div className={styles.grid}>
      {gridState.map((row, yIndex) => (
        <div className={styles.row} key={yIndex}>
          {row.map((number, xIndex) => (
            <Cell
              isFixed={gridInitPositions[yIndex][xIndex]}
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
