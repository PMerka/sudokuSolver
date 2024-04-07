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
}: {
  number: number;
  active: boolean;
  handleSetGrid: (value: string) => void;
  cellRef: React.MutableRefObject<HTMLInputElement[]>;
  position: { xIndex: number; yIndex: number };
  updatePosition: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  const pos = 9 * position.yIndex + position.xIndex;
  return (
    <input
      onFocus={() => {
        updatePosition();
        cellRef.current[pos].setSelectionRange(0, 1);
      }}
      onKeyDown={(e) => onKeyDown(e)}
      ref={(el) => {
        if (el) cellRef.current[pos] = el;
      }}
      type="string"
      onChange={(e) => handleSetGrid(e.target.value)}
      onDragStart={(e) => e.preventDefault()}
      className={styles.cell}
      style={active ? { background: "red" } : {}}
      value={number !== 0 ? number : ""}
    />
  );
};
export default Cell;
