import { Injectable,signal } from '@angular/core';
import { Bishop } from '../pieces/bishop';
import { King } from '../pieces/king';
import { Knight } from '../pieces/knight';
import { Pawn } from '../pieces/pawn';
import { Pieces } from '../pieces/pieces';
import { Queen } from '../pieces/queen';
import { Rook } from '../pieces/rook';

@Injectable({ 
    providedIn: 'root'
})
export class ChessboardService {
    
    chessboard = signal<(Pieces | null)[][]>(this.initializeBoard());

    private initializeBoard(): (Pieces | null)[][] {
        
        const blackPawnRow = [
            new Pawn('Black', 6, 0, 'BPawn.png',"Pawn"),
            new Pawn('Black', 6, 1, 'BPawn.png',"Pawn"),
            new Pawn('Black', 6, 2, 'BPawn.png',"Pawn"),
            new Pawn('Black', 6, 3, 'BPawn.png',"Pawn"),
            new Pawn('Black', 6, 4, 'BPawn.png',"Pawn"),
            new Pawn('Black', 6, 5, 'BPawn.png',"Pawn"),
            new Pawn('Black', 6, 6, 'BPawn.png',"Pawn"),
            new Pawn('Black', 6, 7, 'BPawn.png',"Pawn")
        ];

        const blackPiecesRow = [
            new Rook('Black', 7, 0, 'BRook.png', "Rook"),
            new Knight('Black', 7, 1, 'BKnight.png', "Knight"),
            new Bishop('Black', 7, 2, 'BBishop.png', "Bishop"),
            new Queen('Black', 7, 3, 'BQueen.png', "Queen"),
            new King('Black', 7, 4, 'BKing.png', "King"),
            new Bishop('Black', 7, 5, 'BBishop.png', "Bishop"),
            new Knight('Black', 7, 6, 'BKnight.png', "Knight"),
            new Rook('Black', 7, 7, 'BRook.png', "Rook"),
        ]

        const whitePiecesRow = [
            new Rook('White', 0, 0, 'WRook.png',"Rook" ),
            new Knight('White', 0, 1, 'WKnight.png',"Knight" ),
            new Bishop('White', 0, 2, 'WBishop.png', "Bishop"),
            new Queen('White', 0, 3, 'WQueen.png',"Queen" ),
            new King('White', 0, 4, 'WKing.png', "King"),
            new Bishop('White', 0, 5, 'WBishop.png',"Bishop"),
            new Knight('White', 0, 6, 'WKnight.png',"Knight"),
            new Rook('White', 0, 7, 'WRook.png', "Rook"),
        ]

        const whitePawnRow = [
            new Pawn('White', 1, 0, 'WPawn.png',"Pawn"),
            new Pawn('White', 1, 1,'WPawn.png',"Pawn"),
            new Pawn('White', 1, 2,'WPawn.png',"Pawn"),
            new Pawn('White', 1, 3,'WPawn.png',"Pawn"),
            new Pawn('White', 1, 4,'WPawn.png',"Pawn"),
            new Pawn('White', 1, 5,'WPawn.png',"Pawn"),
            new Pawn('White', 1, 6, 'WPawn.png',"Pawn"),
            new Pawn('White', 1, 7,'WPawn.png',"Pawn"),
        ];

        const emptyRow = Array(8).fill(null);

        return [
            whitePiecesRow.slice(),
            whitePawnRow.slice(),
            emptyRow.slice(),
            emptyRow.slice(),
            emptyRow.slice(),
            emptyRow.slice(),
            blackPawnRow.slice(),
            blackPiecesRow.slice(),
        ];
    }


}





