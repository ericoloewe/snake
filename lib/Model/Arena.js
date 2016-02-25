/*
 * Arena
 */
var Model;
(function (Model) {
    var Arena = (function () {
        function Arena() {
            this.food = new Model.Food();
            this.snake = new Model.Snake();
            console.log(this.snake);
            this.game_loop = undefined;
            this.canvas = null;
            this.context = null;
        }
        Arena.prototype.init = function () {
            this.snake.direction = Model.Direction.right; //default direction
            this.food.create_food(Math.round(Math.random() * (this.width - this.cellWidth) / this.cellWidth), Math.round(Math.random() * (this.height - this.cellWidth) / this.cellWidth));
            this.paintArena();
            this.paintCompleteSnake();
            this.paintFood();
            this.reinit();
        };
        Arena.prototype.reinit = function () {
            var _this = this;
            //Lets move the snake now using a timer which will trigger the paint function
            //every 60ms
            this.snake = new Model.Snake();
            this.paintArena();
            this.paintCompleteSnake();
            this.paintFood();
            if (typeof this.game_loop != "undefined")
                clearInterval(this.game_loop);
            this.game_loop = setInterval(function () { _this.paint(); }, 60);
        };
        //Lets first create a generic function to paint cells
        Arena.prototype.paintCell = function (x, y, colorFill, colorStroke) {
            if (colorFill === void 0) { colorFill = "blue"; }
            if (colorStroke === void 0) { colorStroke = "white"; }
            this.context.fillStyle = colorFill;
            this.context.fillRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
            this.context.strokeStyle = colorStroke;
            this.context.strokeRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
        };
        Arena.prototype.paintArena = function () {
            //Lets paint the canvas now
            this.context.fillStyle = "white";
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.strokeStyle = "white";
            this.context.strokeRect(0, 0, this.width, this.height);
        };
        Arena.prototype.paintCompleteSnake = function () {
            var _this = this;
            this.snake.pointers.forEach(function (pointer) {
                _this.paintCell(pointer.x, pointer.y);
            });
        };
        Arena.prototype.paintSnake = function () {
            //Lets paint 10px wide cells
            this.paintCell(this.snake.face.x, this.snake.face.y);
        };
        Arena.prototype.paintFood = function () {
            this.paintArena();
            //Lets paint the food
            this.paintCell(this.food.pointer.x, this.food.pointer.y);
            //Lets paint the score
            this.context.fillText(this.snake.score.toString(), 5, this.height - 5);
        };
        //Lets paint the snake now
        Arena.prototype.paint = function () {
            //These were the position of the head cell.
            //We will increment it to get the new head position
            //Lets add proper direction based movement now
            this.snake.before_tail = this.snake.pointers[this.snake.pointers.length - 1];
            this.checkDirection();
            //Lets add the game over clauses now
            //This will restart the game if the snake hits the wall
            //Lets add the code for body collision
            //Now if the head of the snake bumps into its body, the game will restart
            if (this.snakeIsOut() || this.checkCollision()) {
                //restart game
                this.reinit();
                //Lets organize the code a bit now.
                return;
            }
            //Lets write the code to make the snake eat the this.food
            //The logic is simple
            //If the new head position matches with that of the this.food,
            //Create a new head instead of moving the tail
            if (this.snake.head.x == this.food.pointer.x && this.snake.head.y == this.food.pointer.y) {
                this.snake.head = this.snake.face;
                this.snake.score.actual++;
                //Create new this.food
                this.food.create_food(Math.round(Math.random() * (this.width - this.cellWidth) / this.cellWidth), Math.round(Math.random() * (this.height - this.cellWidth) / this.cellWidth));
                this.paintFood();
            }
            else {
                this.snake.tail = this.snake.pointers.pop(); //pops out the last cell
                this.snake.head = this.snake.face;
            }
            //The snake can now eat the food.            
            this.snake.pointers.unshift(this.snake.head); //puts back the tail as the first cell
            this.clearLastCell();
            this.paintSnake();
        };
        Arena.prototype.clearLastCell = function () {
            this.paintCell(this.snake.before_tail.x, this.snake.before_tail.y, "white");
        };
        Arena.prototype.checkDirection = function () {
            if (this.snake.direction == Model.Direction.right)
                this.snake.face.x++;
            else if (this.snake.direction == Model.Direction.left)
                this.snake.face.x--;
            else if (this.snake.direction == Model.Direction.up)
                this.snake.face.y--;
            else if (this.snake.direction == Model.Direction.down)
                this.snake.face.y++;
        };
        Arena.prototype.snakeIsOut = function () {
            return this.snake.head.x == -1 || this.snake.head.x == this.width / this.cellWidth ||
                this.snake.head.y == -1 || this.snake.head.y == this.height / this.cellWidth;
        };
        Arena.prototype.checkCollision = function () {
            var _this = this;
            //This function will check if the provided x/y coordinates exist
            //in an array of cells or not
            this.snake.pointers.forEach(function (pointer) {
                if (pointer.x == _this.snake.face.x && pointer.y == _this.snake.face.y)
                    return true;
            });
            return false;
        };
        return Arena;
    })();
    Model.Arena = Arena;
})(Model || (Model = {}));
