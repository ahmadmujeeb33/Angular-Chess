


import { Injectable, inject} from '@angular/core';
import { Pawn } from '../pieces/pawn';

import { ChessboardService } from './chessboard.service';


@Injectable({ 
    providedIn: 'root'
})
export class CheckService {

    chessboardService = inject(ChessboardService)

   
    isCheckRiders(movements: number[][], kingPosition: number[], pieceName: string){

        for(let movement of movements){
            
            let row_counter = kingPosition[0]
            let col_counter = kingPosition[1]

           
            while(row_counter + movement[0]!=-1 && row_counter + movement[0]!=8 && col_counter + movement[1]!=-1 && col_counter + movement[1]!=8){
                
                
                if(this.chessboardService.chessboard()[movement[0] + row_counter][movement[1] + col_counter]?.getColor() == this.chessboardService.playerTurn){
                    break
                }
                
                if (this.chessboardService.chessboard()[movement[0] + row_counter][movement[1] + col_counter]?.getColor() != this.chessboardService.playerTurn && this.chessboardService.chessboard()[movement[0] + row_counter][movement[1] + col_counter]?.getName() == pieceName){

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
            
            if (movement[0] > -1 && movement[0] < 8 && movement[1]  > -1 && movement[1] < 8 && chessboard[movement[0]][movement[1]]?.getColor() != this.chessboardService.playerTurn && chessboard[movement[0]][movement[1]]?.getName() == "Knight"){
                this.chessboardService.pieceCausingCheck.set(`${movement[0]}, ${movement[1]}`)
                return true
            }

        }

        this.chessboardService.pieceCausingCheck.set("")

        return false

    }

    isCheckPawns(kingPosition: number[]){

        let movements:number[][] = []

        if (this.chessboardService.playerTurn == "White"){


            movements.push([1,-1])
            movements.push([-1,-1])

        }

        else if (this.chessboardService.playerTurn == "Black"){
            movements.push([1,1])
            movements.push([-1,1])

        }

        for(let movement of movements){
            
            if (kingPosition[0] + movement[0] > -1 && kingPosition[0] + movement[0] < 8 && kingPosition[1] + movement[1]  > -1 && kingPosition[1] + movement[1] < 8 && this.chessboardService.chessboard()[ kingPosition[0] + movement[0]][ kingPosition[1] + movement[1]]?.getName() == "Pawns"){
                this.chessboardService.pieceCausingCheck.set(`${kingPosition[0] + movement[0]}, ${kingPosition[1] + movement[1]}`)
                return true
            }

        }

        this.chessboardService.pieceCausingCheck.set("")

        return false
    }

   
    isCheck(): boolean {

        const kingPosition = this.getKingPosition()

        let bishopMovements = [ [1,-1],[-1,1],[1,1],[-1,-1],]

        let rookMovements = [ [1,-1],[-1,1],[1,1],[-1,-1],[1,0],[0,-1],[0,1],[-1,0]]

        let queenMovements =  [ [1,-1], [-1,1],[1,1],[-1,-1],[1,0],[0,-1],[0,1],[-1,0]]


        if(this.isCheckRiders(bishopMovements, kingPosition, "Bishop") ||  this.isCheckRiders(rookMovements, kingPosition, "Rook") || this.isCheckRiders(queenMovements, kingPosition, "Queen") || this.isCheckKnight(kingPosition) ||  this.isCheckPawns(kingPosition)
        ){
            return true

        }

        return false

    }


    getKingPosition(){

        let kingPosition: number[] = [0,0]

        this.chessboardService.chessboard().some((row, i) => {

            return row.some((piece,j) => {
                if(piece?.getColor() == this.chessboardService.playerTurn &&  piece?.getName() == "King"){
                    kingPosition[0] = i
                    kingPosition[1] = j
                    return true
                }

                return false
            })
           
        })

        return kingPosition
    }

    canCauseCheck(rowIndex:number, colIndex:number){

        if(this.chessboardService.isCheck){
            return false
        }

        const currVal =  this.chessboardService.chessboard()[rowIndex][colIndex]
         this.chessboardService.chessboard()[rowIndex][colIndex] = null

        if(this.isCheck()){
            this.chessboardService.chessboard()[rowIndex][colIndex]  = currVal
            return true
        }



        this.chessboardService.chessboard()[rowIndex][colIndex]  = currVal
        
        return false
    }


    canSaveCheckMate(){


        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){

                if(this.chessboardService.chessboard()[i][j]?.getColor() === this.chessboardService.playerTurn){
                    
                    let validMoves: number[][] | undefined = this.chessboardService.chessboard()[i][j]?.validMoves(this.chessboardService.chessboard())
                
                    if(validMoves){
                        for(let moves of validMoves){
                        
                            let temp = this.chessboardService.chessboard()[i][j]
                            this.chessboardService.chessboard()[i][j] = this.chessboardService.chessboard()[moves[0]][moves[1]]
                            this.chessboardService.chessboard()[moves[0]][moves[1]] = temp
    
                            if(!this.isCheck()){
                                this.chessboardService.chessboard()[moves[0]][moves[1]] = this.chessboardService.chessboard()[i][j]
                                this.chessboardService.chessboard()[i][j] = temp    
                                return true
                            }
    
                            this.chessboardService.chessboard()[moves[0]][moves[1]] = this.chessboardService.chessboard()[i][j]
                            this.chessboardService.chessboard()[i][j] = temp
        
                        }
                    }
                }
               
            }
        }

        return false
    }

    isCheckMate(){

        const kingPosition = this.getKingPosition()

        if(this.canSaveCheckMate()){
            return false
        }

        const validMoves = this.chessboardService.chessboard()[kingPosition[0]][kingPosition[1]]?.validMoves(this.chessboardService.chessboard())

        if (validMoves) {
            for (const move of validMoves) {
                const val = this.chessboardService.chessboard()[kingPosition[0]][kingPosition[1]];
                this.chessboardService.chessboard()[kingPosition[0]][kingPosition[1]] = null;
                const moveVal = this.chessboardService.chessboard()[move[0]][move[1]]

                this.chessboardService.chessboard()[move[0]][move[1]] = val;


                if (!this.isCheck()) {
                    this.chessboardService.chessboard()[kingPosition[0]][kingPosition[1]] = val;
                    this.chessboardService.chessboard()[move[0]][move[1]] = moveVal;
                    return false; 
                }

                this.chessboardService.chessboard()[kingPosition[0]][kingPosition[1]] = val;
                this.chessboardService.chessboard()[move[0]][move[1]] = moveVal;
            }
        }

        return true

    }
   
}







