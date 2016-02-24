/**
 * Snake
 */
var Model;
(function (Model) {
    var Snake = (function () {
        function Snake() {
            this.pointers = new Array();
            this.face = new Model.Pointer(Snake.INITIAL_LENGTH, 0);
            this.head = new Model.Pointer(Snake.INITIAL_LENGTH - 1, 0);
            this.tail = new Model.Pointer();
            this.before_tail = new Model.Pointer();
            this.score = new Model.Score();
            this.create_snake();
        }
        Object.defineProperty(Snake, "INITIAL_LENGTH", {
            get: function () { return 5; },
            enumerable: true,
            configurable: true
        });
        Snake.prototype.create_snake = function () {
            for (var i = Snake.INITIAL_LENGTH - 1; i >= 0; i--) {
                //This will create a horizontal snake starting from the top left
                this.pointers.push(new Model.Pointer(i, 0));
            }
        };
        return Snake;
    })();
    Model.Snake = Snake;
})(Model || (Model = {}));
