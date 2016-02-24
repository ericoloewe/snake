/**
 * Snake
 */
var Model;
(function (Model) {
    var Snake = (function () {
        function Snake() {
            this.head = new Model.Pointer();
            this.tail = new Model.Pointer();
            this.face = new Model.Pointer();
            this.face = { x: 0, y: 0 };
            this.pointers = new Array();
            this.score = new Model.Score();
            this.create_snake();
        }
        Object.defineProperty(Snake, "INITIAL_LENGTH", {
            get: function () { return 5; },
            enumerable: true,
            configurable: true
        });
        Snake.prototype.create_snake = function () {
            var length = 5; //Length of the snake
            for (var i = Snake.INITIAL_LENGTH - 1; i >= 0; i--) {
                //This will create a horizontal snake starting from the top left
                this.pointers.push({ x: i, y: 0 });
            }
        };
        return Snake;
    })();
    Model.Snake = Snake;
})(Model || (Model = {}));
