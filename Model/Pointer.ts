
/* ===================================================
 * Classe criada para nada mais, nada menos, gerenciar
 * melhor os ponteiros da arena e jogo, fazendo assim,
 * que tenhamos uma boa pratica na programação 
 * ===================================================*/
module Model {
    export class Pointer {
        public x: number;
        public y: number;
        
        constructor(x:number = 0, y:number = 0) {
            this.x = x;
            this.y = y;
        }
    }
}