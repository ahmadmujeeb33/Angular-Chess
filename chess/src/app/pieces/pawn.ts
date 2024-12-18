
import { Component, inject } from '@angular/core';

import { Pieces } from "./pieces";
import { ChessboardService } from '../services/chessboard.service';


export class Pawn extends Pieces {
  


    validMoves(chessboard: (Pieces | null)[][]): string[] {

      
        let newMoves: string[] = []; 

        const prevRow = this.getPrevRow()
        const prevCol = this.getprevCol()

        if(this.getColor() === "Black"){
            if(prevRow === 6 ) {
                newMoves.push(`${prevRow-2}, ${prevCol}`)
            }

            if(chessboard[prevRow-1][prevCol-1]!=null && chessboard[prevRow-1][prevCol-1]?.getColor()!=this.getColor()){
                newMoves.push(`${prevRow-1}, ${prevCol-1}`)
            }

            if(chessboard[prevRow-1][prevCol+1]!=null && chessboard[prevRow-1][prevCol-1]?.getColor()!=this.getColor()){
                newMoves.push(`${prevRow-1}, ${prevCol+1}`)
            }
          
            newMoves.push(`${prevRow-1}, ${prevCol}`)

        }

        else{
            if(prevRow === 1 ) {
                newMoves.push(`${prevRow+2}, ${prevCol}`)
            }

            if(chessboard[prevRow+1][prevCol-1]!=null && chessboard[prevRow-1][prevCol-1]?.getColor()!=this.getColor()){
                newMoves.push(`${prevRow+1}, ${prevCol-1}`)
            }

            if(chessboard[prevRow+1][prevCol+1]!=null && chessboard[prevRow-1][prevCol-1]?.getColor()!=this.getColor()){
                newMoves.push(`${prevRow+1}, ${prevCol-1}`)
            }
          
            newMoves.push(`${prevRow+1}, ${prevCol}`)
        }



        return newMoves

    }

}


