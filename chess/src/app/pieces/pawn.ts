

import { Pieces } from "./pieces";


export class Pawn extends Pieces {
  

    validMoves(chessboard: (Pieces | null)[][]): number[][] {

      
        let newMoves: number[][] = []; 

        const prevRow = this.getPrevRow()
        const prevCol = this.getprevCol()

        if(this.getColor() === "Black"){
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

            if(chessboard[prevRow-1][prevCol]?.getColor()!="White"){
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

            if(chessboard[prevRow+1][prevCol]?.getColor()!="Black"){
                const newMove = [prevRow+1, prevCol]
                newMoves.push(newMove)
            }
          
        }

        return newMoves

    }

}


