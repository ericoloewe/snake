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
            this.before_tail = new Pointer(-1,0);            
            this.score = new Score();
            this.create_snake();
        }
        
        private create_snake() {
            this.pointers = new Array<Pointer>(new Pointer(0,0));
            for(var i = 0; i <= Snake.INITIAL_LENGTH-1 ; i++)
            {
                //This will create a horizontal snake starting from the top left
                this.pointers.push(new Pointer(i,0));
            }
            // É retirado o primeiro elemento do array porque ele estava pegando um valor randomico
            this.pointers.shift();            
            // Foi organizado o array, da maneira que a cabeça esteja no ponto 0
            this.pointers.sort(function(a:Pointer,b:Pointer) {
                return a.x < b.x ? 1 : a.x > b.x ? -1 : 0;
            });
        } 
    }   
}