/*
 * Score
 */
var Model;
(function (Model) {
    var Score = (function () {
        function Score() {
            this.actual = 0;
        }
        Score.prototype.toString = function () {
            return "Score: " + this.actual;
        };
        return Score;
    })();
    Model.Score = Score;
})(Model || (Model = {}));
