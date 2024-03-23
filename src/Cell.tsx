import React, { useState } from "react";

export default function Cell({
  number,
  active,
  handleSetGrid,
}: {
  number: number;
  active: boolean;
  handleSetGrid: (value: string) => void;
}) {
  return (
    <input
      type="number"
      onChange={(e) => handleSetGrid(e.target.value)}
      className="cell"
      style={active ? { background: "red" } : {}}
      value={number !== 0 ? number : ""}
    />
  );
}
