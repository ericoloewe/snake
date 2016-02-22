/*
 * Arena
 */

module Model {    
    export class Arena {
        public canvas: any;
        public context: any;
        public width: number;
        public height: number;
        public cellWidth: number;
        
        //Lets first create a generic function to paint cells
        public paint_cell(x:number, y:number)
        {
            this.context.fillStyle = "blue";
            this.context.fillRect(x*this.cellWidth, y*this.cellWidth, this.cellWidth, this.cellWidth);
            this.context.strokeStyle = "white";
            this.context.strokeRect(x*this.cellWidth, y*this.cellWidth, this.cellWidth, this.cellWidth);
        }
    }
}