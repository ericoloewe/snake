/// <reference path="../Extensions/Jquery/jquery.d.ts" />
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
            this.own = null;
        }
        Arena.prototype.init = function () {
            this.snake.direction = Model.Direction.right; //default direction
            this.food.create_food(Math.round(Math.random() * (this.width)), Math.round(Math.random() * (this.height)));
            this.paintArena();
            this.reinit();
        };
        Arena.prototype.reinit = function () {
            var _this = this;
            //Lets move the snake now using a timer which will trigger the paint function
            //every 60ms
            this.snake = new Model.Snake();
            this.cleanArena();
            this.paintSnake();
            this.paintFood();
            if (typeof this.game_loop != "undefined")
                clearInterval(this.game_loop);
            this.game_loop = setInterval(function () { _this.paint(); }, 100);
        };
        //Lets first create a generic function to paint cells
        Arena.prototype.paintCell = function (x, y, cssClass) {
            if (cssClass === void 0) { cssClass = "activeSnake"; }
            this.own.find(".y" + y + " .x" + x).addClass(cssClass);
        };
        //Lets first create a generic function to paint cells
        Arena.prototype.eraseCell = function (x, y, cssClass) {
            if (cssClass === void 0) { cssClass = "activeSnake"; }
            this.own.find(".y" + y + " .x" + x).removeClass(cssClass);
        };
        Arena.prototype.cleanArena = function () {
            this.own.find("tr td").removeClass("activeSnake");
            this.own.find("tr td").removeClass("activeFood");
        };
        Arena.prototype.cleanSnake = function (cssClass) {
            if (cssClass === void 0) { cssClass = "activeSnake"; }
            if (this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        };
        Arena.prototype.cleanFood = function (cssClass) {
            if (cssClass === void 0) { cssClass = "activeFood"; }
            if (this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        };
        Arena.prototype.paintArena = function () {
            //Lets paint the canvas now
            var html = "";
            for (var i = 0; i < this.height; i++) {
                html += "<tr height='10' class='y" + i + "'>";
                for (var j = 0; j < this.width; j++)
                    html += "<td width='10' class='x" + j + "'></td>";
                html += "</tr>";
            }
            this.own.html(html);
        };
        Arena.prototype.paintFood = function () {
            this.cleanFood();
            //Lets paint the food
            this.paintCell(this.food.pointer.x, this.food.pointer.y, "activeFood");
            //Lets paint the score
            $(".score").text(this.snake.score.toString());
        };
        Arena.prototype.paintSnake = function () {
            var _this = this;
            if (this.own.find("tr td.active").length === this.snake.pointers.length) {
                this.mosey();
            }
            else {
                this.cleanSnake();
                this.snake.pointers.forEach(function (pointer) {
                    _this.paintCell(pointer.x, pointer.y);
                });
            }
        };
        Arena.prototype.clearLastCell = function () {
            this.eraseCell(this.snake.before_tail.x, this.snake.before_tail.y);
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
            return this.snake.head.x == -1 || this.snake.head.x == this.width ||
                this.snake.head.y == -1 || this.snake.head.y == this.height;
        };
        Arena.prototype.snakeEat = function () {
            return this.snake.head.x == this.food.pointer.x &&
                this.snake.head.y == this.food.pointer.y;
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
        Arena.prototype.mosey = function () {
            this.clearLastCell();
            //Lets paint 10px wide cells
            this.paintCell(this.snake.face.x, this.snake.face.y);
        };
        //Lets paint the snake now
        Arena.prototype.paint = function () {
            this.snake.tail = this.snake.pointers[this.snake.pointers.length - 1];
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
            if (this.snakeEat()) {
                this.snake.head = this.snake.face;
                this.snake.score.actual++;
                //Create new this.food
                this.food.create_food(Math.round(Math.random() * (this.width)), Math.round(Math.random() * (this.height)));
                this.paintFood();
            }
            else {
                this.snake.before_tail = this.snake.pointers.pop(); //pops out the last cell
                this.snake.tail = this.snake.pointers[this.snake.pointers.length - 1];
                this.snake.head = this.snake.face;
            }
            this.snake.pointers.unshift(this.snake.head);
            this.paintSnake();
            this.checkDirection();
            console.log(this);
            setTimeout(function () {
                debugger;
            }, 10000);
        };
        return Arena;
    })();
    Model.Arena = Arena;
})(Model || (Model = {}));
