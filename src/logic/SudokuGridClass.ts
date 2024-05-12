export class SudokuGrid{
    grid: number[][];
    constructor(){
        const array = []
        for (let y = 0; y < 9; y += 1) {
            const row = new Array(9).fill(0)
            array.push(row)
        }
        this.grid = array
    }

    setGridValue({x, y, newValue}: {x: number, y: number, newValue: number}){
        this.grid[y][x] = newValue
    }

    cleanGrid = () => {
        const array = []
        for (let y = 0; y < 9; y += 1) {
            const row = new Array(9).fill(0)
            array.push(row)
        }
        this.grid = array
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

    isValidNumber = ({testX, testY, testValue}: {testX: number, testY: number, testValue: number}) => {
        //check row
        for(let x = 0; x < 9; x+=1){
            if(this.grid[testY][x] === testValue){
                return false
            } 
        }

        //check column
        for(let y = 0; y< 9; y+=1){
            if(this.grid[y][testX] === testValue){
                return false
            } 
        }

        //check square
        const xStartSquare = 3 * Math.floor(testX / 3);
        const yStartSquare = 3 * Math.floor(testY / 3);
        for (let y = yStartSquare; y < yStartSquare + 3; y += 1) {
            for (let x = xStartSquare; x < xStartSquare + 3; x += 1) {
                const isTestPosition = y === testY && x === testX
                if (this.grid[y][x] === testValue && !isTestPosition) {
                    return false
                } 
            }
        }

        return true
    }
}

