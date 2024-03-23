/**
 * Function checks if number at given position meets sudoku rules
 */
export const isValidNumber = ({
    grid,
    xPosition,
    yPosition,
    number,
  }: {
    grid: number[][];
    xPosition: number;
    yPosition: number;
    number: number;
  }) => {
    const target = grid[yPosition][xPosition];
  
    if (target !== 0) {
      return Error("Not empty");
    }
  
    //check row
    const activeRow = grid[yPosition];
    const rowIncludes = activeRow.includes(number);
    if (rowIncludes) {
      return false;
    }
  
    //check column
    const activeColumn = grid.map((row) => row[xPosition]);
    const columnIncludes = activeColumn.includes(number);
    if (columnIncludes) {
      return false;
    }
  
    //check square
    const xStartSquare = 3 * Math.floor(xPosition / 3);
    const yStartSquare = 3 * Math.floor(yPosition / 3);
  
    for (let y = yStartSquare; y < yStartSquare + 3; y += 1) {
      for (let x = xStartSquare; x < xStartSquare + 3; x += 1) {
        if (grid[y][x] === number) {
          return false;
        }
      }
    }
  
    return true;
  };