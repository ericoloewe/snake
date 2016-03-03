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
         * Inicia realmente a Arena, montando a mesma e iniciando o jogo
         */
        Score.prototype.toString = function () {
            return "SCORE: " + this.actual;
        };
        return Score;
    })();
    Model.Score = Score;
})(Model || (Model = {}));
