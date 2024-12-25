import { Component, inject, signal } from '@angular/core';


import { ChessboardService } from '../services/chessboard.service';
import { CheckService } from '../services/check.service';
import { ChessColor } from '../utils/utils';




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

  isCheckVal = '' 
  isCheckMate = signal(false)
  playerTurn = ChessColor.BLACK


  getCellColor(rowIndex: number, colIndex: number): string {
    let res = (rowIndex + colIndex) % 2 === 0 ? 'gray' : 'white'

    if( this.highlightedCells.has(`${rowIndex}, ${colIndex}`)){
      res +=  ` opacity`

    }

    if(this.isCheckVal[0] ==  rowIndex.toString() && this.isCheckVal[3] ==  colIndex.toString()){
      console.log("in here")
      res+=  ` check`
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
  

  movePieces(rowIndex:number, colIndex: number){

    let old_pos = this.chessboardService.chessboard()[this.lastClickedCell.row][this.lastClickedCell.col]


    this.chessboardService.chessboard()[this.lastClickedCell.row][this.lastClickedCell.col] = null

    old_pos?.setPrevRow(rowIndex)
    old_pos?.setPrevCol(colIndex)

    this.chessboardService.chessboard()[rowIndex][colIndex] = old_pos

  }

  revertPiece(rowIndex:number, colIndex: number){
    let old_pos = this.chessboardService.chessboard()[rowIndex][colIndex]
  
    this.chessboardService.chessboard()[this.lastClickedCell.row][this.lastClickedCell.col] = old_pos


    old_pos?.setPrevRow(this.lastClickedCell.row)
    old_pos?.setPrevCol(this.lastClickedCell.col)

    this.chessboardService.chessboard()[rowIndex][colIndex] = null
  }


  validMoves (rowIndex:number, colIndex:number) {

    if( this.playerTurn === this.chessboardService.chessboard()[rowIndex][colIndex]?.getColor()){
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
      this.movePieces(rowIndex, colIndex)

      if (this.checkService.isCheck(this.playerTurn)){
        
        this.revertPiece(rowIndex, colIndex)

        return

      }

      if(!this.chessboardService.isCheck){
        this.playerTurn = this.playerTurn === ChessColor.BLACK ? ChessColor.WHITE : ChessColor.BLACK;
      }

      if(this.checkService.isCheck(this.playerTurn)){

        this.chessboardService.isCheck = true
        this.isCheckVal = this.chessboardService.pieceCausingCheck()

        if(this.checkService.isCheckMate(this.playerTurn)){
          this.isCheckMate.set(true)
        }
      }
      else{

        if(this.chessboardService.isCheck){
          this.playerTurn = this.playerTurn === ChessColor.BLACK ? ChessColor.WHITE : ChessColor.BLACK;
        }
        
        this.isCheckVal = ''
        this.chessboardService.isCheck = false
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
