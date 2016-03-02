/* ===================================================
 * Classe criada para nada mais, nada menos, gerenciar
 * melhor os ponteiros da arena e jogo, fazendo assim,
 * que tenhamos uma boa pratica na programação
 * ===================================================*/
var Model;
(function (Model) {
    var Pointer = (function () {
        function Pointer(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        return Pointer;
    })();
    Model.Pointer = Pointer;
})(Model || (Model = {}));
