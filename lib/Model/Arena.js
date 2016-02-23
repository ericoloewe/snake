/*
 * Arena
 */
var Model;
(function (Model) {
    var Arena = (function () {
        function Arena() {
            this.init();
        }
        Arena.prototype.init = function () {
            this.snake.direction = Model.Direction.right; //default direction
            this.food.create_food(Math.round(Math.random() * (this.width - this.cellWidth) / this.cellWidth), Math.round(Math.random() * (this.height - this.cellWidth) / this.cellWidth));
            //finally lets display the score
            this.snake.score = 0;
            //Lets move the snake now using a timer which will trigger the paint function
            //every 60ms
            if (typeof game_loop != "undefined")
                clearInterval(game_loop);
            game_loop = setInterval(this.paint, 60);
        };
        //Lets first create a generic function to paint cells
        Arena.prototype.paint_cell = function (x, y) {
            this.context.fillStyle = "blue";
            this.context.fillRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
            this.context.strokeStyle = "white";
            this.context.strokeRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
        };
        //Lets paint the snake now
        Arena.prototype.paint = function () {
            //To avoid the snake trail we need to paint the BG on every frame
            //Lets paint the canvas now
            this.context.fillStyle = "white";
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.strokeStyle = "black";
            this.context.strokeRect(0, 0, this.width, this.height);
            //The movement code for the snake to come here.
            //The logic is simple
            //Pop out the tail cell and place it infront of the head cell
            var nx = this.snake.pointers[0].x;
            var ny = this.snake.pointers[0].y;
            //These were the position of the head cell.
            //We will increment it to get the new head position
            //Lets add proper direction based movement now
            if (this.snake.direction == Model.Direction.right)
                nx++;
            else if (this.snake.direction == Model.Direction.left)
                nx--;
            else if (this.snake.direction == Model.Direction.up)
                ny--;
            else if (this.snake.direction == Model.Direction.down)
                ny++;
            //Lets add the game over clauses now
            //This will restart the game if the snake hits the wall
            //Lets add the code for body collision
            //Now if the head of the snake bumps into its body, the game will restart
            if (nx == -1 || nx == this.width / this.cellWidth || ny == -1 || ny == this.height / this.cellWidth || this.check_collision(nx, ny, this.snake)) {
                //restart game
                this.init();
                //Lets organize the code a bit now.
                return;
            }
            //Lets write the code to make the snake eat the this.food
            //The logic is simple
            //If the new head position matches with that of the this.food,
            //Create a new head instead of moving the tail
            var tail = { x: null, y: null };
            if (nx == this.food.pointers.x && ny == this.food.pointers.y) {
                tail = { x: nx, y: ny };
                this.snake.score++;
                //Create new this.food
                this.food.create_food(Math.round(Math.random() * (this.width - this.cellWidth) / this.cellWidth), Math.round(Math.random() * (this.height - this.cellWidth) / this.cellWidth));
            }
            else {
                tail = this.snake.pointers.pop(); //pops out the last cell
                tail.x = nx;
                tail.y = ny;
            }
            //The snake can now eat the this.food.
            this.snake.pointers.unshift(tail); //puts back the tail as the first cell
            for (var i = 0; i < this.snake.pointers.length; i++) {
                var c = this.snake.pointers[i];
                //Lets paint 10px wide cells
                this.paint_cell(c.x, c.y);
            }
            //Lets paint the this.food
            this.paint_cell(this.food.pointers.x, this.food.pointers.y);
            //Lets paint the score
            var score_text = "Score: " + this.snake.score;
            this.context.fillText(score_text, 5, this.height - 5);
        };
        Arena.prototype.check_collision = function (x, y, snake) {
            var array = this.snake.pointers;
            //This function will check if the provided x/y coordinates exist
            //in an array of cells or not
            for (var i = 0; i < array.length; i++) {
                if (array[i].x == x && array[i].y == y)
                    return true;
            }
            return false;
        };
        return Arena;
    })();
    Model.Arena = Arena;
})(Model || (Model = {}));
