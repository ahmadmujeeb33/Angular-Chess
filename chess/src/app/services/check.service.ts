


import { Injectable, inject} from '@angular/core';
import { Pawn } from '../pieces/Pawn';

import { ChessboardService } from './chessboard.service';
import { ChessColor } from '../utils/utils';

import { ChessPieces } from '../utils/utils';


@Injectable({ 
    providedIn: 'root'
})
export class CheckService {

    chessboardService = inject(ChessboardService)

    kingColor = ""

    isCheckRiders(movements: number[][], kingPosition: number[], pieceName: string){

        for(let movement of movements){
            
            let row_counter = kingPosition[0]
            let col_counter = kingPosition[1]

           
            while(row_counter + movement[0]!=-1 && row_counter + movement[0]!=8 && col_counter + movement[1]!=-1 && col_counter + movement[1]!=8){
                
                const color = this.chessboardService.chessboard()[movement[0] + row_counter][movement[1] + col_counter]?.getColor()
                const name = this.chessboardService.chessboard()[movement[0] + row_counter][movement[1] + col_counter]?.getName()
                
                if(color == this.kingColor){
                    break
                }
                
                if (color != this.kingColor && name == pieceName){

                    this.chessboardService.pieceCausingCheck.set(`${movement[0] + row_counter}, ${movement[1] + col_counter}`)
                    
                    return true
                }

                row_counter+=movement[0]
                col_counter+=movement[1]

            }
        }

        this.chessboardService.pieceCausingCheck.set("")

        return false

    }


    isCheckKnight(kingPosition: number[]){

        const chessboard = this.chessboardService.chessboard() 

        let knightMovements:[number, number][] = [
            [kingPosition[0]+1, kingPosition[1]+2],
            [kingPosition[0]+2, kingPosition[1]+1],
            [kingPosition[0]+2, kingPosition[1]-1],
            [kingPosition[0]-1, kingPosition[1]+2],
            [kingPosition[0]-2, kingPosition[1]+1],
            [kingPosition[0]+1, kingPosition[1]-2],
            [kingPosition[0]-2, kingPosition[1]-1],
            [kingPosition[0]-1, kingPosition[1]-2]

        ];

        for(let movement of knightMovements){
            
            if (movement[0] > -1 && movement[0] < 8 && movement[1]  > -1 && movement[1] < 8 && chessboard[movement[0]][movement[1]]?.getColor() != this.kingColor && chessboard[movement[0]][movement[1]]?.getName() == ChessPieces.KNIGHT){
                this.chessboardService.pieceCausingCheck.set(`${movement[0]}, ${movement[1]}`)
                return true
            }

        }

        this.chessboardService.pieceCausingCheck.set("")

        return false

    }

    isCheckPawns(kingPosition: number[], playerTurn: string){

        let movements:number[][] =  playerTurn === ChessColor.WHITE ? [[1, -1], [-1, -1]]: [[1, 1], [-1, 1]];

        for(let movement of movements){

            let row = kingPosition[0] + movement[0]
            let col = kingPosition[1] + movement[1]
          
            
            if (row > -1 && row < 8 && col  > -1 && col < 8){
                
                let name = this.chessboardService.chessboard()[row][col]?.getName()
                let color = this.chessboardService.chessboard()[row][col]?.getColor()

                if(name == ChessPieces.PAWN && color != this.kingColor){
                    this.chessboardService.pieceCausingCheck.set(`${row}, ${col}`)
                    return true

                }
                
            }

        }

        this.chessboardService.pieceCausingCheck.set("")

        return false
    }

   
    isCheck(playerTurn: string): boolean {

        const kingPosition = this.getKingPosition(playerTurn)

        let bishopMovements = [ [1,-1],[-1,1],[1,1],[-1,-1],]

        let rookMovements = [ [1,-1],[-1,1],[1,1],[-1,-1],[1,0],[0,-1],[0,1],[-1,0]]

        let queenMovements =  [ [1,-1], [-1,1],[1,1],[-1,-1],[1,0],[0,-1],[0,1],[-1,0]]


        if(this.isCheckRiders(bishopMovements, kingPosition, ChessPieces.BISHOP) ||  this.isCheckRiders(rookMovements, kingPosition, ChessPieces.ROOK) || this.isCheckRiders(queenMovements, kingPosition, ChessPieces.QUEEN) || this.isCheckKnight(kingPosition) ||  this.isCheckPawns(kingPosition, playerTurn)
        ){
            return true

        }

        return false

    }


    getKingPosition(playerTurn: string){

        let kingPosition: number[] = [0,0]

        this.chessboardService.chessboard().some((row, i) => {

            return row.some((piece,j) => {
                
                if(piece?.getColor() == playerTurn &&  piece?.getName() == ChessPieces.KING){
                    this.kingColor = piece?.getColor()
                    kingPosition[0] = i
                    kingPosition[1] = j
                    return true
                }

                return false
            })
           
        })

        return kingPosition
    }

  
    canSaveCheckMate(playerTurn: string){

        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){

                if(this.chessboardService.chessboard()[i][j]?.getColor() === this.kingColor && this.chessboardService.chessboard()[i][j]!= null){
                    
                    let validMoves: number[][] | undefined = this.chessboardService.chessboard()[i][j]?.validMoves(this.chessboardService.chessboard())
                
                    if(validMoves){
                        for(let moves of validMoves){
                        
                            let temp = this.chessboardService.chessboard()[i][j]
                            this.chessboardService.chessboard()[i][j] = this.chessboardService.chessboard()[moves[0]][moves[1]]
                            this.chessboardService.chessboard()[moves[0]][moves[1]] = temp

                            const stillInCheck = this.isCheck(playerTurn);

                            this.chessboardService.chessboard()[moves[0]][moves[1]] = this.chessboardService.chessboard()[i][j]
                            this.chessboardService.chessboard()[i][j] = temp

                            if(!stillInCheck){
                                return true
                            }
        
                        }
                    }
                }
               
            }
        }

        return false
    }

    isCheckMate(playerTurn: string){

        if(this.canSaveCheckMate(playerTurn)){
            return false
        }

        const kingPosition = this.getKingPosition(playerTurn)

        const validMoves = this.chessboardService.chessboard()[kingPosition[0]][kingPosition[1]]?.validMoves(this.chessboardService.chessboard())

        if (validMoves) {
            for (const move of validMoves) {
                const val = this.chessboardService.chessboard()[kingPosition[0]][kingPosition[1]];
                this.chessboardService.chessboard()[kingPosition[0]][kingPosition[1]] = null;
                const moveVal = this.chessboardService.chessboard()[move[0]][move[1]]

                this.chessboardService.chessboard()[move[0]][move[1]] = val;

                const stillInCheck = this.isCheck(playerTurn);

                this.chessboardService.chessboard()[kingPosition[0]][kingPosition[1]] = val;
                this.chessboardService.chessboard()[move[0]][move[1]] = moveVal;

                if(!stillInCheck){
                    return false
                }
            }
        }

        return true

    }

}







