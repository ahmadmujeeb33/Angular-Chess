import { Injectable,signal } from '@angular/core';
import { Bishop } from '../pieces/bishop';
import { Knight } from '../pieces/knight';
import { Pawn } from '../pieces/pawn';
import { Pieces } from '../pieces/pieces';

@Injectable({ 
    providedIn: 'root'
})
export class ChessboardService {
    
    chessboard = signal<(Pieces | null)[][]>(this.initializeBoard());

    private initializeBoard(): (Pieces | null)[][] {
        
        const blackPawnRow = [
            new Pawn('Black', 6, 0, 'BPawn.png'),
            new Pawn('Black', 6, 1, 'BPawn.png'),
            new Pawn('Black', 6, 2, 'BPawn.png'),
            new Pawn('Black', 6, 3, 'BPawn.png'),
            new Pawn('Black', 6, 4, 'BPawn.png'),
            new Pawn('Black', 6, 5, 'BPawn.png'),
            new Pawn('Black', 6, 6, 'BPawn.png'),
            new Pawn('Black', 6, 7, 'BPawn.png')
        ];

        const blackPiecesRow = [
            null,
            new Knight('Black', 7, 1, 'BKnight.png'),
            new Bishop('Black', 7, 2, 'BBishop.png'),
            null,
            null,
            new Bishop('Black', 7, 5, 'BBishop.png'),
            new Knight('Black', 7, 6, 'BKnight.png'),
            null
        ]

        const whitePiecesRow = [
            null,
            new Knight('White', 0, 1, 'WKnight.png'),
            new Bishop('White', 0, 2, 'WBishop.png'),
            null,
            null,
            new Bishop('White', 0, 5, 'WBishop.png'),
            new Knight('White', 0, 6, 'WKnight.png'),
            null
        ]

        const whitePawnRow = [
            new Pawn('White', 1, 0, 'WPawn.png'),
            new Pawn('White', 1, 1,'WPawn.png'),
            new Pawn('White', 1, 2,'WPawn.png'),
            new Pawn('White', 1, 3,'WPawn.png'),
            new Pawn('White', 1, 4,'WPawn.png'),
            new Pawn('White', 1, 5,'WPawn.png'),
            new Pawn('White', 1, 6, 'WPawn.png'),
            new Pawn('White', 1, 7,'WPawn.png'),
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





