/*
 * Arena
 */
var Model;
(function (Model) {
    var Arena = (function () {
        function Arena() {
            this.food = new Model.Food();
            this.snake = new Model.Snake();
            this.game_loop = undefined;
            this.canvas = null;
            this.context = null;
        }
        Arena.prototype.init = function () {
            this.snake.direction = Model.Direction.right; //default direction
            this.food.create_food(Math.round(Math.random() * (this.width - this.cellWidth) / this.cellWidth), Math.round(Math.random() * (this.height - this.cellWidth) / this.cellWidth));
            this.paintWall();
        };
        Arena.prototype.reinit = function () {
            var _this = this;
            //Lets move the snake now using a timer which will trigger the paint function
            //every 60ms
            if (typeof this.game_loop != "undefined")
                clearInterval(this.game_loop);
            this.game_loop = setInterval(function () { _this.paint(); }, 60);
        };
        //Lets first create a generic function to paint cells
        Arena.prototype.paintCell = function (x, y) {
            this.context.fillStyle = "blue";
            this.context.fillRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
            this.context.strokeStyle = "white";
            this.context.strokeRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
        };
        Arena.prototype.paintWall = function () {
            //Lets paint the canvas now
            this.context.fillStyle = "white";
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.strokeStyle = "black";
            this.context.strokeRect(0, 0, this.width, this.height);
        };
        //Lets paint the snake now
        Arena.prototype.paint = function () {
            //To avoid the snake trail we need to paint the BG on every frame            
            //The movement code for the snake to come here.
            //The logic is simple
            //Pop out the tail cell and place it infront of the head cell
            // this.snake.face
            //These were the position of the head cell.
            //We will increment it to get the new head position
            //Lets add proper direction based movement now
            this.checkDirection();
            //Lets add the game over clauses now
            //This will restart the game if the snake hits the wall
            //Lets add the code for body collision
            //Now if the head of the snake bumps into its body, the game will restart
            if (this.snake.face.x == -1 || this.snake.face.x == this.width / this.cellWidth || this.snake.face.y == -1 || this.snake.face.y == this.height / this.cellWidth || this.checkCollision()) {
                //restart game
                this.reinit();
                //Lets organize the code a bit now.
                return;
            }
            //Lets write the code to make the snake eat the this.food
            //The logic is simple
            //If the new head position matches with that of the this.food,
            //Create a new head instead of moving the tail
            var tail = new Model.Pointer();
            if (this.snake.face.x == this.food.pointers.x && this.snake.face.y == this.food.pointers.y) {
                tail = this.snake.face;
                this.snake.score.actual++;
                //Create new this.food
                this.food.create_food(Math.round(Math.random() * (this.width - this.cellWidth) / this.cellWidth), Math.round(Math.random() * (this.height - this.cellWidth) / this.cellWidth));
            }
            else {
                tail = this.snake.pointers.pop(); //pops out the last cell
                tail.x = this.snake.face.x;
                tail.y = this.snake.face.y;
            }
            //The snake can now eat the this.food.
            this.snake.pointers.unshift(tail); //puts back the tail as the first cell
            for (var i = 0; i < this.snake.pointers.length; i++) {
                var c = this.snake.pointers[i];
                //Lets paint 10px wide cells
                this.paintCell(c.x, c.y);
            }
            //Lets paint the this.food
            this.paintCell(this.food.pointers.x, this.food.pointers.y);
            //Lets paint the score
            this.context.fillText(this.snake.score.toString(), 5, this.height - 5);
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
        Arena.prototype.checkCollision = function () {
            var array = this.snake.pointers;
            //This function will check if the provided x/y coordinates exist
            //in an array of cells or not
            for (var i = 0; i < array.length; i++) {
                if (array[i].x == this.snake.face.x && array[i].y == this.snake.face.y)
                    return true;
            }
            return false;
        };
        return Arena;
    })();
    Model.Arena = Arena;
})(Model || (Model = {}));
