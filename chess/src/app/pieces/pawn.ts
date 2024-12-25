

import { Piece } from "./Piece";

import { ChessColor } from "../utils/utils";

export class Pawn extends Piece {
  

    validMoves(chessboard: (Piece | null)[][]): number[][] {

      
        let newMoves: number[][] = []; 

        const prevRow = this.getPrevRow()
        const prevCol = this.getprevCol()

        if(this.getColor() === ChessColor.BLACK){
            if(prevRow === 6 ) {
                const newMove = [prevRow-2, prevCol]
                newMoves.push(newMove)
            }

            if(chessboard[prevRow-1][prevCol-1]!=null && chessboard[prevRow-1][prevCol-1]?.getColor()!=this.getColor()){
                const newMove = [prevRow-1, prevCol-1]
                newMoves.push(newMove)
            }

            if(chessboard[prevRow-1][prevCol+1]!=null && chessboard[prevRow-1][prevCol+1]?.getColor()!=this.getColor()){
                const newMove = [prevRow-1, prevCol+1]
                newMoves.push(newMove)
            }

            if(chessboard[prevRow-1][prevCol]?.getColor()!=ChessColor.WHITE){
                const newMove = [prevRow-1, prevCol]
                newMoves.push(newMove)
            }
          

        }

        else{
            if(prevRow === 1 ) {
                const newMove = [prevRow+2, prevCol]
                newMoves.push(newMove)
            }

            if(chessboard[prevRow+1][prevCol-1]!=null && chessboard[prevRow+1][prevCol-1]?.getColor()!=this.getColor()){
                const newMove = [prevRow+1, prevCol-1]
                newMoves.push(newMove)
            }

            if(chessboard[prevRow+1][prevCol+1]!=null && chessboard[prevRow+1][prevCol+1]?.getColor()!=this.getColor()){
                const newMove = [prevRow+1, prevCol+1]
                newMoves.push(newMove)
            }

            if(chessboard[prevRow+1][prevCol]?.getColor()!=ChessColor.BLACK){
                const newMove = [prevRow+1, prevCol]
                newMoves.push(newMove)
            }
          
        }

        return newMoves

    }

}


