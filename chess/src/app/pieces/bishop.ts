



import { Pieces } from "./pieces";


export class Bishop extends Pieces {
  

    validMoves(chessboard: (Pieces | null)[][]): string[] {

        console.log("in knight")
      
        let newMoves: string[] = []; 

        let prevRow = this.getPrevRow()
        let prevCol = this.getprevCol()

        let movements:[number, number][] = [
            [1,1],[1,-1],[-1,1],[-1,-1]
        ];


        for(let movement of movements){
            
            let row_counter = prevRow
            let col_counter = prevCol
           
            while(row_counter + movement[0]!=-1 && row_counter + movement[0]!=8 && col_counter + movement[1]!=-1 && col_counter + movement[1]!=8){
                
                if (chessboard[movement[0] + row_counter][movement[1] + col_counter]?.getColor() != this.getColor() && chessboard[movement[0] + row_counter][movement[1] + col_counter]?.getColor() != null){
                    newMoves.push(`${movement[0] + row_counter}, ${movement[1] + col_counter}`)
                    break
                }

                if (chessboard[movement[0] + row_counter][movement[1] + col_counter]?.getColor() == this.getColor()){
                    break
                }
                
                
                newMoves.push(`${movement[0] + row_counter}, ${movement[1] + col_counter}`)

                row_counter+=movement[0]
                col_counter+=movement[1]

            }
            
        }
       
        return newMoves

    }

}




