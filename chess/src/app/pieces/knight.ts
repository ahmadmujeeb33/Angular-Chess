



import { Pieces } from "./pieces";


export class Knight extends Pieces {
  

    validMoves(chessboard: (Pieces | null)[][]): string[] {

        console.log("in knight")
      
        let newMoves: string[] = []; 

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
                newMoves.push(`${movement[0]}, ${movement[1]}`)
            }
            
        }

        console.log("newmoves", newMoves)
       
        return newMoves

    }

}



