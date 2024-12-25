

import { Piece } from "./Piece";

import { ChessColor } from "../utils/utils";

export class Pawn extends Piece {
  

    validMoves(chessboard: (Piece | null)[][]): number[][] {

      
        let newMoves: number[][] = []; 

        const prevRow = this.getPrevRow()
        const prevCol = this.getprevCol()

        const initialPawnMove = prevRow === 6 ? -2 : 2
        const pawnMove = this.getColor() == ChessColor.BLACK ? -1: +1

        if(prevRow === 6  || prevRow === 1 ){
            const newMove = [prevRow+initialPawnMove, prevCol]
            newMoves.push(newMove)
        }

        if(chessboard[prevRow+pawnMove][prevCol]==null){
            const newMove = [prevRow+pawnMove, prevCol]
            newMoves.push(newMove)
        }

        if(chessboard[prevRow+pawnMove][prevCol+pawnMove]!=null && chessboard[prevRow+pawnMove][prevCol+pawnMove]?.getColor()!=this.getColor()){
            const newMove = [prevRow-1, prevCol-1]
            newMoves.push(newMove)
        }


        if(this.getColor() === ChessColor.BLACK){

            if(chessboard[prevRow+pawnMove][prevCol+1]!=null && chessboard[prevRow-1][prevCol+1]?.getColor()!=this.getColor()){
                const newMove = [prevRow-1, prevCol+1]
                newMoves.push(newMove)
            }      

        }

        else{

            if(chessboard[prevRow+pawnMove][prevCol-1]!=null && chessboard[prevRow+1][prevCol-1]?.getColor()!=this.getColor()){
                const newMove = [prevRow+1, prevCol-1]
                newMoves.push(newMove)
            }
          
        }

        return newMoves

    }

}


