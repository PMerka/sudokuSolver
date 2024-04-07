import { SudokuGrid } from "./SudokuGridClass"
export class SudokuSolverRealTime extends SudokuGrid{
    updateGridReactState: {(x: number, y: number, grid: number[][]) : void} | null;
    delay: number;
    running: boolean;


    constructor(){
        super()
        this.updateGridReactState = null
        this.delay = 0
        this.running = false
    }

    setUpdateGridReactState = (updateGridState: (x: number, y: number, value: number[][] ) => void ) => {
        this.updateGridReactState = updateGridState
    }

    startSolving = () => {
        console.log(this.grid)
        this.running = true
        const originalGrid = structuredClone(this.grid)
        const result = this.solveSudokuRecursion()
        if(!result){
            this.grid = originalGrid
        }
    }

    solveSudokuRecursion = async () => {
        console.log(this.grid)
        if(!this.running) return
        //await new Promise((resolve) => setTimeout(resolve, this.delay));
        const emptyPlace = this.findEmpty()
        console.log( emptyPlace)
        if(!emptyPlace){
            return true;
        }

        for (let testNumber = 1; testNumber < 10; testNumber += 1) {
            const isTestNumberValid = this.isValidNumber({testX: emptyPlace.x, testY: emptyPlace.y, testValue: testNumber});
            if (isTestNumberValid) {
                this.grid[emptyPlace.y][emptyPlace.x] = testNumber;
                console.log(JSON.stringify(this.grid), testNumber, emptyPlace)
                if(this.updateGridReactState !== null){
                    this.updateGridReactState(emptyPlace.x, emptyPlace.y, this.grid)
                }
                const nextIterationIsValid = await this.solveSudokuRecursion()
                console.log(nextIterationIsValid)
                if (nextIterationIsValid) {
                    return true;
                }
                this.grid[emptyPlace.y][emptyPlace.x] = 0;
            }
        }
    return false;
    }
}