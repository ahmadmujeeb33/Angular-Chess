



import { Pieces } from "./pieces";


export class Knight extends Pieces {
  

    validMoves(chessboard: (Pieces | null)[][]): number[][] {

      
        let newMoves: number[][] = []; 

        const prevRow = this.getPrevRow()
        const prevCol = this.getprevCol()

        let movements:[number, number][] = [
            [prevRow+1, prevCol+2],
            [prevRow+2, prevCol+1],
            [prevRow+2, prevCol-1],
            [prevRow-1, prevCol+2],

            [prevRow-2, prevCol+1],
            [prevRow+1, prevCol-2],
            [prevRow-2, prevCol-1],
            [prevRow-1, prevCol-2]

        ];

        for(let movement of movements){
            if (movement[0] > -1 && movement[0] < 8 && movement[1]  > -1 && movement[1] < 8 && chessboard[movement[0]][movement[1]]?.getColor() != this.getColor()){
                let newMove = [movement[0], movement[1]]
                newMoves.push(newMove)
            }
            
        }

       
        return newMoves

    }

}




