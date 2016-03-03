/// <reference path="../Extensions/Jquery/jquery.d.ts" />

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
         * Carrega a melhor pontuação, que provavelmente ira estar em um simples txt ou json
         */
        public loadHighScore() {
            this.actual = window.localStorage.getItem('highScore');
            if(this.actual == null)
                window.localStorage.setItem('highScore', "0");
        }
        
        private setHighScore(score:number) {
            window.localStorage.setItem('highScore', score.toString());
            this.actual = score;
        }
        
        /**
         * Retorna o score da cobra em uma string   
         */
        public isBestScore(score:number) {
            if (this.actual < score)
            {
                this.setHighScore(score);
                return true;
            }
            return false;                
        }
        
        /**
         * Retorna o score da cobra em uma string   
         */
        public toString() {
            return "SCORE: " + this.actual;
        }
        
        /**
         * Retorna o highScore da arena em uma string   
         */
        public highScoreToString() {
            return "HIGH SCORE: " + this.actual;
        }
    }
}