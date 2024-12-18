import { Injectable,signal } from '@angular/core';
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
            emptyRow.slice(),
            whitePawnRow.slice(),
            emptyRow.slice(),
            emptyRow.slice(),
            emptyRow.slice(),
            emptyRow.slice(),
            blackPawnRow.slice(),
            emptyRow.slice(),
        ];
    }


}





