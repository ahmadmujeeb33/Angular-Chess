



import { Piece } from "./Piece";


export class King extends Piece {
  

    validMoves(chessboard: (Piece | null)[][]): number[][] {
      
        let newMoves: number[][] = []; 

        let prevRow = this.getPrevRow()
        let prevCol = this.getprevCol()

        let movements:[number, number][] = [
            [ 1,0],[-1,0],[0,1],[0,-1],[1,-1],[1,1],[-1,-1],[-1,1]
        ];


        for(let movement of movements){
            if ( prevRow + movement[0] > -1 && prevRow + movement[0] < 8 && prevCol + movement[1]  > -1 && prevCol + movement[1] < 8 && chessboard[prevRow + movement[0]][ prevCol + movement[1]]?.getColor() != this.getColor()){
                const newMove = [prevRow + movement[0], prevCol + movement[1]]
                newMoves.push(newMove)
            }
            
        }
       
        return newMoves

    }

}




