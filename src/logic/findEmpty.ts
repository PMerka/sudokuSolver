export const findEmpty = (grid: number[][]) => {
    for (let y = 0; y < grid.length; y += 1) {
      for (let x = 0; x < grid.length; x += 1) {
        if (grid[y][x] === 0) {
          return { x, y };
        }
      }
    }
    return null;
  };