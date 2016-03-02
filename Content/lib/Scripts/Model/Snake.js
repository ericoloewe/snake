/* ===================================================
 * Classe criada para gerenciar o personagem do jogo
 * ===================================================*/
var Model;
(function (Model) {
    var Snake = (function () {
        function Snake() {
            this.pointers = new Array();
            this.face = new Model.Pointer(Snake.INITIAL_LENGTH, 0);
            this.head = new Model.Pointer(Snake.INITIAL_LENGTH - 1, 0);
            this.tail = new Model.Pointer();
            this.before_tail = new Model.Pointer(-1, 0);
            this.score = new Model.Score();
            this.create_snake();
            this.direction = Model.Direction.right;
        }
        Object.defineProperty(Snake, "INITIAL_LENGTH", {
            get: function () { return 5; },
            enumerable: true,
            configurable: true
        });
        /**
         * Inicia e cria a cobra(personagem)
         */
        Snake.prototype.create_snake = function () {
            this.pointers = new Array(new Model.Pointer(0, 0));
            for (var i = 0; i <= Snake.INITIAL_LENGTH - 1; i++) {
                // De maneira que a direção dele esteja apontando para a direita
                this.pointers.push(new Model.Pointer(i, 0));
            }
            // É retirado o primeiro elemento do array porque ele estava pegando um valor randomico
            this.pointers.shift();
            // Foi organizado o array, da maneira que a cabeça esteja no ponto 0
            this.pointers.sort(function (a, b) {
                return a.x < b.x ? 1 : a.x > b.x ? -1 : 0;
            });
        };
        return Snake;
    })();
    Model.Snake = Snake;
})(Model || (Model = {}));
