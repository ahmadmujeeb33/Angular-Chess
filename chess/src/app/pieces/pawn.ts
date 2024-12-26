

import { Piece } from "./Piece";

import { ChessColor } from "../utils/utils";

export class Pawn extends Piece {
  

    validMoves(chessboard: (Piece | null)[][]): number[][] {

      
        let newMoves: number[][] = []; 

        const prevRow = this.getPrevRow()
        const prevCol = this.getprevCol()


        const initialDirection = prevRow === 6 ? -2 : 2
        const direction = this.getColor() == ChessColor.BLACK ? -1: +1

        if(prevRow === 6  || prevRow === 1 ){
            const newMove = [prevRow+initialDirection, prevCol]
            newMoves.push(newMove)
        }

        if(chessboard[prevRow+direction][prevCol]==null){
            const newMove = [prevRow+direction, prevCol]
            newMoves.push(newMove)
        }

        if(chessboard[prevRow+direction][prevCol+direction]!=null && chessboard[prevRow+direction][prevCol+direction]?.getColor()!=this.getColor()){
            const newMove = [prevRow+direction, prevCol+direction]
            newMoves.push(newMove)
        }

        const colDirection  = this.getColor() == ChessColor.BLACK ? +1: -1

        if(chessboard[prevRow+direction][prevCol+colDirection]!=null && chessboard[prevRow+direction][prevCol+colDirection]?.getColor()!=this.getColor()){
            const newMove = [prevRow+direction, prevCol+colDirection]
            newMoves.push(newMove)
        }      

        return newMoves

    }

}


