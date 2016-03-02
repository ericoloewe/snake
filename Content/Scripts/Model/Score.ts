
/* ===================================================
 * Classe criada para gerenciar o score do jogo
 * ===================================================*/
module Model {
    export class Score {
        public actual: number;
        
        constructor() {
            this.actual = 0;
        }
        
        /**
         * Inicia realmente a Arena, montando a mesma e iniciando o jogo   
         */
        public toString() {
            return "Score: " + this.actual;
        }
    }
}