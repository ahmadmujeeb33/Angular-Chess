import { Component, inject } from '@angular/core';
import { Pawn } from '../pieces/pawn';
import { Pieces } from '../pieces/pieces';

import { ChessboardService } from '../services/chessboard.service';
import { CheckService } from '../services/check.service';


@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})

export class BoardComponent {

  
  highlightedCells: Set<string> = new Set();
  lastClickedCell: { row: number; col: number } = {row:-1, col:-1}; 
  playerTurn: string = "Black"

  chessboardService = inject(ChessboardService)
  checkService = inject(CheckService)
  

  getCellColor(rowIndex: number, colIndex: number): string {
    const res = (rowIndex + colIndex) % 2 === 0 ? 'gray' : 'white'

    if( this.highlightedCells.has(`${rowIndex}, ${colIndex}`)){
      return `${res} opacity`

    }

    return res

  }

  handleCellSelection(rowIndex: number, colIndex: number): void {
    this.lastClickedCell.row = rowIndex;
    this.lastClickedCell.col = colIndex;
  
    

    const pieces = this.chessboardService.chessboard()[rowIndex][colIndex]
    
   
    if (pieces !== null) {
      const res = pieces.validMoves(this.chessboardService.chessboard());
      this.updateHighlightedCells(res);
    }
  }

  validMoves (rowIndex:number, colIndex:number) {


    if(this.playerTurn === this.chessboardService.chessboard()[rowIndex][colIndex]?.getColor() && !this.checkService.canCauseCheck(rowIndex,colIndex,this.playerTurn) ){
      if(this.highlightedCells.size!=0  &&  !this.highlightedCells.has(`${rowIndex}, ${colIndex}`)){

     
        this.highlightedCells.clear()
  
        this.handleCellSelection(rowIndex, colIndex)
  
      }
  
      else if(this.highlightedCells.size==0){
        this.handleCellSelection(rowIndex, colIndex)
  
      }
    }
   

    else if(this.highlightedCells.has(`${rowIndex}, ${colIndex}`)){
      this.highlightedCells.clear()

      let old_pos = this.chessboardService.chessboard()[this.lastClickedCell.row][this.lastClickedCell.col]

      const oldColor = old_pos?.getColor();
      const newColor = this.chessboardService.chessboard()[rowIndex][colIndex]?.getColor();

      if (oldColor === "Black" && (newColor === "White" || !newColor)) {
        this.playerTurn = "White";
        
      } 
      
      else if (oldColor === "White" && (newColor === "Black" || !newColor)) {
        this.playerTurn = "Black";
      }


      this.chessboardService.chessboard()[this.lastClickedCell.row][this.lastClickedCell.col] = null


      old_pos?.setPrevRow(rowIndex)
      old_pos?.setPrevCol(colIndex)

      this.chessboardService.chessboard()[rowIndex][colIndex] = old_pos

      if(this.checkService.isCheck(this.playerTurn)){
        if(this.checkService.isCheckMate(this.playerTurn)){
          console.log("in checkmate")
        }
        else{
          console.log("in check")

        }
      }
    }

  }

  updateHighlightedCells(highlightedCells:  number[][]){

    for (const cell of highlightedCells) {
    
      this.highlightedCells.add(`${cell[0]}, ${cell[1]}`)
      
      
    }


  }

  isCellHighlighted(rowIndex: number, colIndex: number){
  
    const ans =  this.highlightedCells.has(`${rowIndex}, ${colIndex}`);
    return ans

  }

}
