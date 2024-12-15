import { Component, signal } from '@angular/core';



@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  
  chessboard:string[][] = [];

  
  ngOnInit() {
    this.chessboard = this.initializeBoard();
  }

  initializeBoard() {
    
    const blackRow = [
      { type: 'rook', color: 'black'},
      { type: 'knight', color: 'black'},
      { type: 'bishop', color: 'black'},
      { type: 'queen', color: 'black'},
      { type: 'king', color: 'black'},
      { type: 'bishop', color: 'black'},
      { type: 'knight', color: 'black'},
      { type: 'rook', color: 'black'},
    ];
  
    const pawnRow = Array(8).fill({ type: 'pawn', color: 'black' });

    const emptyRow = Array(8).fill(null);

    const whitePawnRow = Array(8).fill({ type: 'pawn', color: 'white' });

    const whiteRow = [
      { type: 'rook', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'queen', color: 'white' },
      { type: 'king', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'rook', color: 'white' },
    ];

    const chessboard = [
      blackRow, 
      pawnRow,     
      emptyRow,   
      emptyRow,
      emptyRow,
      emptyRow,
      whitePawnRow, 
      whiteRow,    
    ];

    console.log("typeof(chessboard)", Array.isArray(chessboard))

    return chessboard
  
  }

  getCellColor (rowIndex:number, colIndex:number) {
       
    const res =  (rowIndex + colIndex) % 2 === 0 ? 'gray' : 'white'

    return res

  }




}
