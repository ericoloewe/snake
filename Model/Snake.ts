/**
 * Snake
 */

module Model {
    export class Snake {
        public static get INITIAL_LENGTH():number { return 5; }
        
        public face: Pointer;
        public head: Pointer;
        public tail: Pointer;
        public before_tail: Pointer;
        public pointers: Array<Pointer>;
        public score: Score;
        public direction: Direction;
        
        constructor() {
            this.pointers = new Array<Pointer>();
            this.face = new Pointer(Snake.INITIAL_LENGTH, 0);
            this.head = new Pointer(Snake.INITIAL_LENGTH-1, 0);
            this.tail = new Pointer();            
            this.before_tail = new Pointer();            
            this.score = new Score();
            this.create_snake();
        }
        
        private create_snake() {
            for(var i = Snake.INITIAL_LENGTH-1; i >= 0 ; i--)
            {                
                //This will create a horizontal snake starting from the top left
                this.pointers.push(new Pointer(i,0));
            }
        }
    }   
}