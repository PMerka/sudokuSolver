class SudokuGrid{
    grid: number[][];
    constructor(){
        const row = new Array(9).fill(0)
        this.grid = new Array(9).fill(row)
    }

    setGridValue({x, y, newValue}: {x: number, y: number, newValue: number}){
        this.grid[y][x] = newValue
    }

    findEmpty = () => {
        for (let y = 0; y < 9; y += 1) {
          for (let x = 0; x < 9; x += 1) {
            if (this.grid[y][x] === 0) {
              return { x, y };
            }
          }
        }
        return null;
    }

    isValidNumber = ({testY, testX, testValue}: {testY: number, testX: number, testValue: number}) => {
        //check row
        for(let x = 0; x< 9; x+=1){
            if(x === testX) continue // ignore its own position
            if(this.grid[x][testY] === testValue) return false
            
        }

        //check column
        for(let y = 0; y< 9; y+=1){
            if(y === testY) continue
            if(this.grid[y][testX] === testValue) return false
        }

        //check square
        const xStartSquare = 3 * Math.floor(testX / 3);
        const yStartSquare = 3 * Math.floor(testY / 3);
        for (let y = yStartSquare; y < yStartSquare + 3; y += 1) {
            for (let x = xStartSquare; x < xStartSquare + 3; x += 1) {
                const isTestPosition = y === testY && x === testX
                if (this.grid[y][x] === testValue && !isTestPosition) return false;
            }
        }

        return true
    }
}