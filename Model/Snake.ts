/**
 * Snake
 */

module Model {
    export class Snake {
        public static get INITIAL_LENGTH():number { return 5; }
        
        public face: Pointer;
        public head: Pointer;
        public tail: Pointer;
        public pointers: Array<Pointer>;
        public score: Score;
        public direction: Direction;
        
        constructor() {
            this.head = new Pointer();
            this.tail = new Pointer();            
            this.face = new Pointer();
            this.face = { x: 0, y: 0 };
            this.pointers = new Array<Pointer>();
            this.score = new Score();
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