import React from "react";
import styles from "./Cell.module.css";

const Cell = ({
  number,
  active,
  handleSetGrid,
  cellRef,
  position,
  updatePosition,
  onKeyDown,
  isFixed,
}: {
  number: number;
  active: boolean;
  handleSetGrid: (value: string) => void;
  cellRef: React.MutableRefObject<HTMLInputElement[]>;
  position: { xIndex: number; yIndex: number };
  updatePosition: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isFixed: boolean;
}) => {
  const xSquere = Math.floor(position.xIndex / 3);
  const ySquere = Math.floor(position.yIndex / 3);

  const isBlue = (xSquere + ySquere) % 2 === 0;

  const pos = 9 * position.yIndex + position.xIndex;
  return (
    <div
      className={`${styles.cell} ${active && styles.activeCell} ${
        isBlue ? styles.blue : styles.gray
      }`}
    >
      <input
        id={`x${position.xIndex} y${position.yIndex}`}
        onFocus={() => {
          updatePosition();
          cellRef.current[pos].setSelectionRange(0, 1);
        }}
        className={`${styles.input} ${isFixed && styles.fixedCell}`}
        onKeyDown={(e) => onKeyDown(e)}
        ref={(el) => {
          if (el) cellRef.current[pos] = el;
        }}
        type="string"
        onChange={(e) => handleSetGrid(e.target.value)}
        onDragStart={(e) => e.preventDefault()}
        value={number !== 0 ? number : ""}
        autoComplete="off"
      />
    </div>
  );
};
export default Cell;
