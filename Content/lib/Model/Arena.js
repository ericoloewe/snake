/// <reference path="../Extensions/Jquery/jquery.d.ts" />
/* ===================================================
 * Classe criada para gerenciar, e apresentar a arena
 * do jogo na tela
 * ===================================================*/
var Model;
(function (Model) {
    var Arena = (function () {
        function Arena() {
            this.food = new Model.Food();
            this.snake = new Model.Snake();
            this.highScore = new Model.Score();
            this.highScore.loadHighScore();
            this.paintHighScore();
            this.game_loop = undefined;
            this.own = null;
        }
        /**
         * Inicia realmente a Arena, montando a mesma
         */
        Arena.prototype.init = function () {
            var _this = this;
            this.food.create_food(Math.round(Math.random() * (this.width)), Math.round(Math.random() * (this.height)));
            this.paintArena();
            this.paintSnake();
            this.paintFood();
            $(".init").click(function () {
                $(".menu").addClass("hidden");
                arena.start();
            });
        };
        /**
         * Inicia o jogo
         */
        Arena.prototype.start = function () {
            var _this = this;
            this.game_loop = setInterval(function () { _this.paint(); }, 50);
        };
        /**
         * Reinicia a Arena, remontando a mesma e reiniciando o jogo
         */
        Arena.prototype.processToRestart = function () {
            $(".menu.menu-game-over").removeClass("hidden");
            $(".restart").click(function () {
                $(".menu.menu-game-over").addClass("hidden");
                arena.restart();
            });
        };
        /**
         * Reinicia a Arena, remontando a mesma e reiniciando o jogo
         */
        Arena.prototype.restart = function () {
            var _this = this;
            this.snake = new Model.Snake();
            this.cleanArena();
            this.paintSnake();
            this.paintFood();
            if (typeof this.game_loop != undefined)
                clearInterval(this.game_loop);
            this.game_loop = setInterval(function () { _this.paint(); }, 50);
        };
        /**
         * Gerencia as escritas/desenhos na tela
         */
        Arena.prototype.paint = function () {
            if (this.snakeIsOut() || this.checkCollision()) {
                this.processToRestart();
                return;
            }
            this.changePointers();
            this.paintSnake();
            this.checkDirection();
        };
        /**
         * Metodo criado para encontrar o ponto/celula na tela e add uma classe para desenhar o mesmo
         */
        Arena.prototype.paintCell = function (x, y, cssClass) {
            if (cssClass === void 0) { cssClass = "activeSnake"; }
            this.own.find(".y" + y + " .x" + x).addClass(cssClass);
        };
        /**
         * Metodo criado para encontrar o ponto/celula na tela e remover uma classe para apagar o mesmo
         */
        Arena.prototype.eraseCell = function (x, y, cssClass) {
            if (cssClass === void 0) { cssClass = "activeSnake"; }
            this.own.find(".y" + y + " .x" + x).removeClass(cssClass);
        };
        /**
         * Metodo criado para limpar a arena
         */
        Arena.prototype.cleanArena = function () {
            this.own.find("tr td").removeClass("activeSnake");
            this.own.find("tr td").removeClass("activeFood");
        };
        /**
         * Metodo criado para limpar a cobra(personagem) da arena
         */
        Arena.prototype.cleanSnake = function (cssClass) {
            if (cssClass === void 0) { cssClass = "activeSnake"; }
            if (this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        };
        /**
         * Metodo criado para limpar a cobra(personagem) da arena
         */
        Arena.prototype.cleanSnakeHead = function (cssClass) {
            if (cssClass === void 0) { cssClass = "activeSnakeHead"; }
            if (this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        };
        /**
         * Metodo criado para limpar a comida da arena
         */
        Arena.prototype.cleanFood = function (cssClass) {
            if (cssClass === void 0) { cssClass = "activeFood"; }
            if (this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        };
        /**
         * Metodo criado para desenhar/criar a Arena e imprimila na tela
         */
        Arena.prototype.paintArena = function () {
            var html = "";
            for (var i = 0; i < this.height; i++) {
                html += "<tr height='10' class='y" + i + "'>";
                for (var j = 0; j < this.width; j++)
                    html += "<td width='10' class='x" + j + "'></td>";
                html += "</tr>";
            }
            this.own.html(html);
        };
        /**
         * Metodo criado para desenhar a comida na arena
         */
        Arena.prototype.paintFood = function () {
            this.cleanFood();
            //Lets paint the food
            this.paintCell(this.food.pointer.x, this.food.pointer.y, "activeFood");
            //Lets paint the score
            $(".score").text(this.snake.score.toString());
        };
        /**
         * Metodo criado para desenhar a cobra(personagem) na arena
         */
        Arena.prototype.paintSnake = function () {
            var _this = this;
            if (this.own.find("tr td.activeSnake").length === this.snake.pointers.length) {
                this.mosey();
            }
            else {
                this.cleanSnake();
                this.snake.pointers.forEach(function (pointer) {
                    _this.paintCell(pointer.x, pointer.y);
                });
            }
            this.paintSnakeHead();
        };
        Arena.prototype.paintHighScore = function () {
            $(".bestScore").text(this.highScore.highScoreToString());
        };
        /**
         * Metodo criado para desenhar a cobra(personagem) na arena
         */
        Arena.prototype.paintSnakeHead = function () {
            this.cleanSnakeHead();
            this.paintCell(this.snake.head.x, this.snake.head.y, "activeSnakeHead");
        };
        /**
         * Remove a ultima celula(ou ultimo ponto) da tela, no caso, remove a celula que antecede o rabo da cobra
         */
        Arena.prototype.clearLastCell = function () {
            this.eraseCell(this.snake.before_tail.x, this.snake.before_tail.y);
        };
        /**
         * Verifica a direção da cobra e atribui um passo a partir da direção estipulada no momento
         */
        Arena.prototype.checkDirection = function () {
            if (this.snake.direction == Model.Direction.left)
                this.snake.face.x--;
            else if (this.snake.direction == Model.Direction.up)
                this.snake.face.y--;
            else if (this.snake.direction == Model.Direction.down)
                this.snake.face.y++;
            else
                this.snake.face.x++;
        };
        /**
         * Verifica se a cobra esta fora da arena
         */
        Arena.prototype.snakeIsOut = function () {
            // Isto é, verifica se a cabeça da cobra(personagem) esta no ponto(celula) -1 ou no
            // tamanho maximo da arena
            return this.snake.head.x == -1 || this.snake.head.x == this.width ||
                this.snake.head.y == -1 || this.snake.head.y == this.height;
        };
        /**
         * Verifica se a cobra "comeu" a comida
         */
        Arena.prototype.snakeEat = function () {
            // No caso, verifica se o ponto xy da cabeça da cobra é o mesmo da comida
            return this.snake.head.x == this.food.pointer.x &&
                this.snake.head.y == this.food.pointer.y;
        };
        /**
         * Verifica se o score atual é melhor que o HighScore
         */
        Arena.prototype.verifyAndChangeHighScore = function () {
            if (this.highScore.isBestScore(this.snake.score.actual)) {
                this.paintHighScore();
            }
        };
        /**
         * Verifica se a cobra não comeu a si mesmo no jogo
         */
        Arena.prototype.checkCollision = function () {
            var _this = this;
            var ocurredCollision = false;
            this.snake.pointers.forEach(function (pointer) {
                if (pointer.x == _this.snake.face.x && pointer.y == _this.snake.face.y) {
                    ocurredCollision = true;
                }
            });
            return ocurredCollision;
        };
        /**
         * "Move" a cobra, de maneira que não precise a sobrescrever totalmente
         */
        Arena.prototype.mosey = function () {
            // Isto é, limpa o ultimo ponto da cobra(no caso o ponto que é anterior ao rabo)
            this.clearLastCell();
            // E depois, imprime o novo ponto da cobra(no caso o ponto que ficava após a cabeça[a face])
            this.paintCell(this.snake.face.x, this.snake.face.y);
        };
        /**
         * Metodo criado para gerenciar as alteções de ponteiros que acontecem no jogo
         */
        Arena.prototype.changePointers = function () {
            // Como este metodo é chamado, a cada alteração de ponteiro no jogo,
            // A primeira coisa que fazemos é verificar se o novo ponteiro não é uma comida,
            // logo verificamos se a cobra comeu ou não
            if (this.snakeEat()) {
                // Se comeu:
                // - Adicionamos um ponto ao score
                this.snake.score.actual++;
                // - Criamos um novo ponto(celula) da comida
                this.food.create_food(Math.round(Math.random() * (this.width)), Math.round(Math.random() * (this.height)));
                // - E então imprimimos a mesma na tela
                this.paintFood();
                // Verifica se o score atual é maior que o highScore
                this.verifyAndChangeHighScore();
            }
            else {
                // Se não comeu:
                // Retiro o ultimo ponto da cobra, e a coloco no ponto antes do rabo
                this.snake.before_tail = this.snake.pointers.pop(); //pops out the last cell                                
            }
            // E, em ambos os casos:
            // - Defino a cabeça da cobra como os pontos que seriam a face(que esta a frente da cabeça)
            this.snake.head = new Model.Pointer(this.snake.face.x, this.snake.face.y);
            // - Defino o rabo da cobra, como o ultimo ponto que esta no array
            this.snake.tail = this.snake.pointers[this.snake.pointers.length - 1];
            // - Coloco a cabeça, acima de todos os itens do array de ponteiros da cobra
            this.snake.pointers.unshift(this.snake.head);
        };
        return Arena;
    })();
    Model.Arena = Arena;
})(Model || (Model = {}));
