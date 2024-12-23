



import { Pieces } from "./pieces";
import { Riders } from "./riders";


export class Rook extends Pieces {
  
    riders = new Riders()

    validMoves(chessboard: (Pieces | null)[][]): number[][] {


        let prevRow = this.getPrevRow()
        let prevCol = this.getprevCol()
        let color  = this.getColor()


        let movements:[number, number][] = [
            [1,0],[-1,0],[0,1],[0,-1],
            [1,1],[1,-1],[-1,1],[-1,-1]
        ];


        const newMoves = this.riders.getMoves(chessboard, movements, prevRow, prevCol, color)

       
        return newMoves
    

    }

}




