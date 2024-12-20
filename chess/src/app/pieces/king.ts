



import { Pieces } from "./pieces";


export class King extends Pieces {
  

    validMoves(chessboard: (Pieces | null)[][]): string[] {
      
        let newMoves: string[] = []; 

        let prevRow = this.getPrevRow()
        let prevCol = this.getprevCol()

        let movements:[number, number][] = [
            [ 1,0],[-1,0],[0,1],[0,-1],[1,-1],[1,1],[-1,-1],[-1,1]
        ];


        for(let movement of movements){
            if ( prevRow + movement[0] > -1 && prevRow + movement[0] < 8 && prevCol + movement[1]  > -1 && prevCol + movement[1] < 8 && chessboard[prevRow + movement[0]][ prevCol + movement[1]]?.getColor() != this.getColor()){
                newMoves.push(`${prevRow + movement[0]}, ${prevCol + movement[1]}`)
            }
            
        }

        console.log("newMoves", newMoves)
       
        return newMoves

    }

}




