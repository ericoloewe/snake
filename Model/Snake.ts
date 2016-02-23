/**
 * Snake
 */

module Model {
    export class Snake {
        public static get INITIAL_LENGTH():number { return 5; }
        
        
        public pointers: Array<Pointer>;
        public score: number;
        public direction: Direction;
        
        constructor() {
            this.pointers = new Array<Pointer>();
            this.score = 0;
            this.create_snake();            
        }
        
        private create_snake() {
            var length = 5; //Length of the snake
            for(var i = Snake.INITIAL_LENGTH-1; i>=0; i--)
            {
                //This will create a horizontal snake starting from the top left
                this.pointers.push({x: i, y:0});
            }
        }
    }   
}