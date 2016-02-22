/**
 * Snake
 */
var Model;
(function (Model) {
    var Snake = (function () {
        function Snake() {
            this.pointers = new Array();
            this.score = 0;
            this.create_snake();
        }
        Object.defineProperty(Snake, "FIRST_LENGTH", {
            get: function () { return 5; },
            enumerable: true,
            configurable: true
        });
        Snake.prototype.create_snake = function () {
            var length = 5; //Length of the snake
            for (var i = Snake.FIRST_LENGTH - 1; i >= 0; i--) {
                //This will create a horizontal snake starting from the top left
                this.pointers.push({ x: i, y: 0 });
            }
        };
        return Snake;
    })();
    Model.Snake = Snake;
})(Model || (Model = {}));
