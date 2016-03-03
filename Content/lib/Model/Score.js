/// <reference path="../Extensions/Jquery/jquery.d.ts" />
/* ===================================================
 * Classe criada para gerenciar o score do jogo
 * ===================================================*/
var Model;
(function (Model) {
    var Score = (function () {
        function Score() {
            this.actual = 0;
        }
        /**
         * Carrega a melhor pontuação, que provavelmente ira estar em um simples txt ou json
         */
        Score.prototype.loadHighScore = function () {
            this.actual = window.localStorage.getItem('highScore');
            if (this.actual == null)
                window.localStorage.setItem('highScore', "0");
        };
        Score.prototype.setHighScore = function (score) {
            window.localStorage.setItem('highScore', score.toString());
            this.actual = score;
        };
        /**
         * Retorna o score da cobra em uma string
         */
        Score.prototype.isBestScore = function (score) {
            if (this.actual < score) {
                this.setHighScore(score);
                return true;
            }
            return false;
        };
        /**
         * Retorna o score da cobra em uma string
         */
        Score.prototype.toString = function () {
            return "SCORE: " + this.actual;
        };
        /**
         * Retorna o highScore da arena em uma string
         */
        Score.prototype.highScoreToString = function () {
            return "HIGH SCORE: " + this.actual;
        };
        return Score;
    })();
    Model.Score = Score;
})(Model || (Model = {}));
