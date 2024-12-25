import { Injectable,signal,WritableSignal  } from '@angular/core';
import { Bishop } from '../pieces/Bishop';
import { King } from '../pieces/King';
import { Knight } from '../pieces/Knight';
import { Pawn } from '../pieces/Pawn';
import { Piece } from '../pieces/Piece';
import { Queen } from '../pieces/Queen';
import { Rook } from '../pieces/rook';

import { ChessColor } from '../utils/utils';

import { ChessPieces } from '../utils/utils';

import { Images } from '../utils/utils';

@Injectable({ 
    providedIn: 'root'
})
export class ChessboardService {
    
    chessboard = signal<(Piece | null)[][]>(this.initializeBoard());
    playerTurn: string = ChessColor.BLACK

    isCheck: boolean = false

    

    pieceCausingCheck: WritableSignal<string> = signal("");

    private initializeBoard(): (Piece | null)[][] {
        
        const blackPawnRow = [
            new Pawn(ChessColor.BLACK, 6, 0, Images.BLACK_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.BLACK, 6, 1, Images.BLACK_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.BLACK, 6, 2, Images.BLACK_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.BLACK, 6, 3, Images.BLACK_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.BLACK, 6, 4, Images.BLACK_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.BLACK, 6, 5, Images.BLACK_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.BLACK, 6, 6, Images.BLACK_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.BLACK, 6, 7, Images.BLACK_PAWN,ChessPieces.PAWN)
        ];

        const blackPiecesRow = [
            new Rook(ChessColor.BLACK, 7, 0, Images.BLACK_ROOK, ChessPieces.ROOK),
            new Knight(ChessColor.BLACK, 7, 1, Images.BLACK_KNIGHT, ChessPieces.KNIGHT),
            new Bishop(ChessColor.BLACK, 7, 2, Images.BLACK_BISHOP, ChessPieces.BISHOP),
            new Queen(ChessColor.BLACK, 7, 3, Images.BLACK_QUEEN, ChessPieces.QUEEN),
            new King(ChessColor.BLACK, 7, 4, Images.BLACK_KING, ChessPieces.KING),
            new Bishop(ChessColor.BLACK, 7, 5, Images.BLACK_BISHOP, ChessPieces.BISHOP),
            new Knight(ChessColor.BLACK, 7, 6, Images.BLACK_KNIGHT, ChessPieces.KNIGHT),
            new Rook(ChessColor.BLACK, 7, 7, Images.BLACK_ROOK, ChessPieces.ROOK),
        ]

        const whitePiecesRow = [
            new Rook(ChessColor.WHITE, 0, 0, Images.WHITE_ROOK,ChessPieces.ROOK ),
            new Knight(ChessColor.WHITE, 0, 1, Images.WHITE_KNIGHT,ChessPieces.KNIGHT ),
            new Bishop(ChessColor.WHITE, 0, 2, Images.WHITE_BISHOP, ChessPieces.BISHOP),
            new Queen(ChessColor.WHITE, 0, 3, Images.WHITE_QUEEN,ChessPieces.QUEEN ),
            new King(ChessColor.WHITE, 0, 4, Images.WHITE_KING, ChessPieces.KING),
            new Bishop(ChessColor.WHITE, 0, 5, Images.WHITE_BISHOP,ChessPieces.BISHOP),
            new Knight(ChessColor.WHITE, 0, 6, Images.WHITE_KNIGHT,ChessPieces.KNIGHT),
            new Rook(ChessColor.WHITE, 0, 7, Images.WHITE_ROOK, ChessPieces.ROOK),
        ]

        const whitePawnRow = [
            new Pawn(ChessColor.WHITE, 1, 0, Images.WHITE_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.WHITE, 1, 1,Images.WHITE_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.WHITE, 1, 2,Images.WHITE_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.WHITE, 1, 3,Images.WHITE_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.WHITE, 1, 4,Images.WHITE_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.WHITE, 1, 5,Images.WHITE_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.WHITE, 1, 6, Images.WHITE_PAWN,ChessPieces.PAWN),
            new Pawn(ChessColor.WHITE, 1, 7,Images.WHITE_PAWN,ChessPieces.PAWN),
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





