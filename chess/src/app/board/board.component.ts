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

    // if(this.chessboardService.isCheck){
      
    // }

    if(this.chessboardService.playerTurn === this.chessboardService.chessboard()[rowIndex][colIndex]?.getColor() && (!this.checkService.canCauseCheck(rowIndex,colIndex))){
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

        this.chessboardService.chessboard()[this.lastClickedCell.row][this.lastClickedCell.col] = null
  
  
        old_pos?.setPrevRow(rowIndex)
        old_pos?.setPrevCol(colIndex)

        this.chessboardService.chessboard()[rowIndex][colIndex] = old_pos

  
        if (this.chessboardService.isCheck && this.checkService.isCheck()){
          let old_pos = this.chessboardService.chessboard()[rowIndex][colIndex]
    
          this.chessboardService.chessboard()[this.lastClickedCell.row][this.lastClickedCell.col] = old_pos
    
    
          old_pos?.setPrevRow(this.lastClickedCell.row)
          old_pos?.setPrevCol(this.lastClickedCell.col)
  
          this.chessboardService.chessboard()[rowIndex][colIndex] = null
        }

        else{
          
          if (oldColor === "Black" ) {
            this.chessboardService.playerTurn = "White";
            
          } 
          
          else if (oldColor === "White") {
            this.chessboardService.playerTurn = "Black";
          }
    
          if(this.checkService.isCheck()){
            this.chessboardService.isCheck = true
            if(this.checkService.isCheckMate()){
              console.log("in checkmate")
            }
            else{
              console.log("in check")
    
            }
          }
          else{
            this.chessboardService.isCheck = false

          }
        }
  
  
       
      // }

   
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
