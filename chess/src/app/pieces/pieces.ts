


export abstract class Pieces {
    
    private color: string;
    private prevRow: number
    private prevCol: number
    private name: string
    public image: string

    constructor(color: string,  prevRow: number, prevCol:number, image: string, name:string){
        this.color = color
        this.prevRow = prevRow
        this.prevCol = prevCol
        this.image = image
        this.name = name
    }

    abstract validMoves(chessboard: (Pieces | null)[][]):  string[];

    setPrevRow(row:number){
        this.prevRow = row
    }

    setPrevCol(col:number){
        this.prevCol = col
    }

    getColor() {
        return this.color
    }

    getPrevRow(){
        return this.prevRow
    }

    getprevCol(){
        return this.prevCol
    }

    getName(){
        return this.name
    }

}

