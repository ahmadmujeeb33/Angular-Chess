
import { Pieces } from "./pieces";



export class Riders  {

    getMoves(chessboard: (Pieces | null)[][], movements: [number, number][], prevRow:number, prevCol:number, color: string): number[][] {

      
        let newMoves: number[][] = []; 

        for(let movement of movements){
            
            let row_counter = prevRow
            let col_counter = prevCol
           
            while(row_counter + movement[0]!=-1 && row_counter + movement[0]!=8 && col_counter + movement[1]!=-1 && col_counter + movement[1]!=8){
                
                if (chessboard[movement[0] + row_counter][movement[1] + col_counter]?.getColor() != color && chessboard[movement[0] + row_counter][movement[1] + col_counter]?.getColor() != null){
                    const newMove = [movement[0] + row_counter, movement[1] + col_counter]
                    newMoves.push(newMove)                    
                    break
                }

                if (chessboard[movement[0] + row_counter][movement[1] + col_counter]?.getColor() == color){
                    break
                }
                
                
                const newMove = [movement[0] + row_counter, movement[1] + col_counter]
                newMoves.push(newMove)    
                
                row_counter+=movement[0]
                col_counter+=movement[1]

            }
            
        }
       
        return newMoves

    }


}
