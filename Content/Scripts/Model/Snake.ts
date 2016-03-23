
/* ===================================================
 * Classe criada para gerenciar o personagem do jogo
 * ===================================================*/
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
            this.direction = Direction.right;
        }
        
        /**
         * Inicia e cria a cobra(personagem)
         */
        private create_snake() {
            this.pointers = new Array<Pointer>(new Pointer(0, 0, WhatIsThisTypes.Snake));
            for(var i = 0; i <= Snake.INITIAL_LENGTH-1 ; i++)
            {
                // De maneira que a direção dele esteja apontando para a direita
                this.pointers.push(new Pointer(i, 0, WhatIsThisTypes.Snake));
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