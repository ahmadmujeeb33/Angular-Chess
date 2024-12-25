



import { Piece } from "./Piece";
import { Rider } from "./Rider";


export class Rook extends Piece {
  

    validMoves(chessboard: (Piece | null)[][]): number[][] {


        let prevRow = this.getPrevRow()
        let prevCol = this.getprevCol()
        let color  = this.getColor()


        let movements:[number, number][] = [
            [1,1],[1,-1],[-1,1],[-1,-1]
        ];


        const newMoves = Rider.getMoves(chessboard, movements, prevRow, prevCol, color)

       
        return newMoves
    

    }

}




