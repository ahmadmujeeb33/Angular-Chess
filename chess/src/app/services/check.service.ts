


import { Injectable, inject} from '@angular/core';

import { ChessboardService } from './chessboard.service';


@Injectable({ 
    providedIn: 'root'
})
export class CheckService {

    chessboardService = inject(ChessboardService)

    isCheckRiders(movements: number[][], kingPosition: number[], playerTurn: string, pieceName: string){

        for(let movement of movements){
            
            let row_counter = kingPosition[0]
            let col_counter = kingPosition[1]

            const chessboard = this.chessboardService.chessboard() 
           
            while(row_counter + movement[0]!=-1 && row_counter + movement[0]!=8 && col_counter + movement[1]!=-1 && col_counter + movement[1]!=8){
                
                if (chessboard[movement[0] + row_counter][movement[1] + col_counter]?.getColor() != playerTurn && chessboard[movement[0] + row_counter][movement[1] + col_counter]?.getName() == pieceName){
                    return true
                }

            

                row_counter+=movement[0]
                col_counter+=movement[1]

            }
        }

        return false

    }


    isCheckKnight(kingPosition: number[], playerTurn: string){

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
            
            if (movement[0] > -1 && movement[0] < 8 && movement[1]  > -1 && movement[1] < 8 && chessboard[movement[0]][movement[1]]?.getColor() != playerTurn && chessboard[movement[0]][movement[1]]?.getName() == "Knight"){
                return true
            }

        }

        return false

    }

    isCheckPawns(playerTurn: string){

        let movements:number[][] = []

        if (playerTurn == "White"){
            movements.push([1,-1])
            movements.push([-1,-1])

        }

        else if (playerTurn == "Black"){
            movements.push([1,1])
            movements.push([-1,1])

        }
    }

   
    isCheck(playerTurn: string): boolean {

        const kingPosition = this.getKingPosition(playerTurn)

        let bishopMovements = [ [1,-1],[-1,1],[1,1],[-1,-1],]

        let rookMovements = [ [1,-1],[-1,1],[1,1],[-1,-1],[1,0],[0,-1],[0,1],[-1,0]]

        let queenMovements =  [ [1,-1], [-1,1],[1,1],[-1,-1],[1,0],[0,-1],[0,1],[-1,0]]


        if(this.isCheckRiders(bishopMovements, kingPosition,playerTurn, "Bishop") ||  this.isCheckRiders(rookMovements, kingPosition,playerTurn, "Rook") || this.isCheckRiders(queenMovements, kingPosition,playerTurn, "Queen") || this.isCheckKnight(kingPosition,playerTurn) ||  this.isCheckPawns(playerTurn)
        ){

            return true

        }

       
        return false

    }



    getKingPosition(playerTurn:  String){

        let kingPosition: number[] = [0,0]

        this.chessboardService.chessboard().some((row, i) => {

            return row.some((piece,j) => {
                if(piece?.getColor() == playerTurn &&  piece?.getName() == "King"){
                    kingPosition[0] = i
                    kingPosition[1] = j
                    return true
                }

                return false
            })
           
        })

        return kingPosition
    }

    canCauseCheck(rowIndex:number, colIndex:number,playerTurn:string){

        const currVal = this.chessboardService.chessboard()[rowIndex][colIndex]
        this.chessboardService.chessboard()[rowIndex][colIndex] = null

        if(this.isCheck(playerTurn)){
            console.log("can save check")
            this.chessboardService.chessboard()[rowIndex][colIndex]  = currVal
            return true
        }


        this.chessboardService.chessboard()[rowIndex][colIndex]  = currVal
        
        return false
    }
   
}







