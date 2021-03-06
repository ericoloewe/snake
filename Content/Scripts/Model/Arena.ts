/// <reference path="../Extensions/Jquery/jquery.d.ts" />

/* ===================================================
 * Classe criada para gerenciar, e apresentar a arena
 * do jogo na tela
 * ===================================================*/
module Model {    
    export class Arena {
        public own: JQuery;
        public matriz: Pointer[][];
        public width: number;
        public height: number;
        public cellWidth: number;
        public speed: number;
        public static get MIN_SPEED():number { return 100; }
        public highScore: Score;
        public snake: Snake;
        public food: Food;
        public game_loop: any;
        
        constructor() {  
            this.food = new Food();
            this.snake = new Snake();
            this.highScore = new Score();
            this.highScore.loadHighScore();
            this.paintHighScore();
            this.speed = 50;
            this.game_loop = undefined;
            this.own = null;  
            this.height = 40;
            this.width = 50;
            this.initMatriz();
        }
        
        /**
         * Inicia realmente a Arena, montando a mesma   
         */
        public init()
        {
            var _this = this;
            
            this.food.create_food(Math.round(Math.random()*(this.width)), Math.round(Math.random()*(this.height)));
            
            this.putSnakeOnMatriz();
            this.paintArena();
            this.paintSnake();
            this.paintFood(); 
            
            $(".init").click(function() {
                $(".menu").addClass("hidden");
                
                _this.start();
            });        
        }
        
        /**
         * Coloca os ponteiros da cobra dentro da matriz da arena   
         */
        public putSnakeOnMatriz()
        {
            var _this = this;
            
            this.snake.pointers.forEach(function(pointer) {
                _this.matriz[pointer.y][pointer.x].whatIsIt = pointer.whatIsIt;
            });
        }
        
        /**
         * Cria a matriz da arena   
         */
        public initMatriz()
        {            
            this.matriz = [];
            for(var i:number = 0; i < this.height; i++)
            {
                this.matriz[i] = [];
                for(var j:number = 0; j < this.width; j++)
                {
                    this.matriz[i][j] = new Pointer(j,i);
                }
            }  
        }
        
        /**
         * Inicia o jogo   
         */
        public start()
        {
            var _this = this;
            
            this.game_loop = setInterval(function() {_this.play();}, this.speed);            
        }
        
        /**
         * Reinicia a Arena, remontando a mesma e reiniciando o jogo   
         */
        public processToRestart()
        {
            $(".menu.menu-game-over").removeClass("hidden");
            
            $(".restart").click(function() {
                $(".menu.menu-game-over").addClass("hidden");
                
                arena.restart();
            });  
        }
        
        /**
         * Reinicia a Arena, remontando a mesma e reiniciando o jogo   
         */
        public restart()
        {
            var _this = this;
            this.snake = new Snake();
            this.cleanArena();
            this.paintSnake();
            this.paintFood();
            this.speed = Arena.MIN_SPEED;
            if(typeof this.game_loop != undefined) 
                clearInterval(this.game_loop);
            this.game_loop = setInterval(function() {_this.play();}, this.speed); 
        }
        
        /**
         * Gerencia as escritas/desenhos na tela   
         */
        private play()
        {         
            if(this.snakeIsOut() || this.checkCollision())
            {
                this.processToRestart();
                return;
            }
            
            this.changePointers();
            
            this.paintSnake();
            
            this.checkDirection();            
        }
        
        /**
         * Metodo criado para encontrar o ponto/celula na tela e add uma classe para desenhar o mesmo   
         */
        private paintCell(x:number, y:number, cssClass:string = "activeSnake")
        {            
            this.own.find(".y"+y+" .x"+x).addClass(cssClass);
        }
        
        /**
         * Metodo criado para encontrar o ponto/celula na tela e remover uma classe para apagar o mesmo   
         */
        private eraseCell(x:number, y:number, cssClass:string = "activeSnake")
        {
            this.own.find(".y"+y+" .x"+x).removeClass(cssClass);
        }
        
        /**
         * Metodo criado para limpar a arena   
         */
        private cleanArena()
        {
            this.own.find("tr td").removeClass("activeSnake");
            this.own.find("tr td").removeClass("activeFood");
        }
        
        /**
         * Metodo criado para limpar a cobra(personagem) da arena   
         */
        private cleanSnake(cssClass:string = "activeSnake")
        {
            if(this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        }
        
        /**
         * Metodo criado para limpar a cobra(personagem) da arena   
         */
        private cleanSnakeHead(cssClass:string = "activeSnakeHead")
        {
            if(this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        }
        
        /**
         * Metodo criado para limpar a comida da arena   
         */
        private cleanFood(cssClass:string = "activeFood")
        {
            if(this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        }
        
        /**
         * Metodo criado para desenhar/criar a Arena e imprimila na tela   
         */
        private paintArena() 
        {
            var html:string = "";
            for(var i = 0; i < this.height; i++)
            {
                html += "<tr height='10' class='y"+i+"'>";                
                for(var j = 0; j < this.width; j++)
                    html += "<td width='10' class='x"+j+"'></td>";
                html += "</tr>";
            }
            this.own.html(html);                    
        }
        
        /**
         * Metodo criado para desenhar a comida na arena   
         */
        private paintFood()
        {
            this.cleanFood();
            //Lets paint the food
            this.paintCell(this.food.pointer.x, this.food.pointer.y, "activeFood");
            //Lets paint the score
            $(".score").text(this.snake.score.toString());
        }
        
        /**
         * Metodo criado para desenhar a cobra(personagem) na arena   
         */
        private paintSnake()
        {
            var _this = this;
            if(this.own.find("tr td.activeSnake").length === this.snake.pointers.length)
            {
                this.mosey();
            } else {
                this.cleanSnake();
                this.snake.pointers.forEach(function(pointer) {
                    _this.paintCell(pointer.x, pointer.y);
                });
            }
            this.paintSnakeHead();
        }
        
        private paintHighScore()
        {
            $(".bestScore").text(this.highScore.highScoreToString());
        }
        
        /**
         * Metodo criado para desenhar a cobra(personagem) na arena   
         */
        private paintSnakeHead()
        {
            this.cleanSnakeHead();
            this.paintCell(this.snake.head.x, this.snake.head.y, "activeSnakeHead");
        }
        
        /**
         * Remove a ultima celula(ou ultimo ponto) da tela, no caso, remove a celula que antecede o rabo da cobra   
         */
        private clearLastCell()
        {
            this.eraseCell(this.snake.before_tail.x, this.snake.before_tail.y);
        }
        
        /**
         * Verifica a direção da cobra e atribui um passo a partir da direção estipulada no momento
         */
        private checkDirection()
        {            
            if(this.snake.direction == Direction.left) this.snake.face.x--;
            else if(this.snake.direction == Direction.up) this.snake.face.y--;
            else if(this.snake.direction == Direction.down) this.snake.face.y++;
            else this.snake.face.x++;
        }
        
        /**
         * Verifica se a cobra esta fora da arena
         */
        private snakeIsOut() 
        {
            // Isto é, verifica se a cabeça da cobra(personagem) esta no ponto(celula) -1 ou no
            // tamanho maximo da arena
            return this.snake.head.x == -1 || this.snake.head.x == this.width || 
                   this.snake.head.y == -1 || this.snake.head.y == this.height;
        }
        
        /**
         * Verifica se a cobra "comeu" a comida
         */
        private snakeEat() 
        {
            // No caso, verifica se o ponto xy da cabeça da cobra é o mesmo da comida
            return this.snake.head.x == this.food.pointer.x && 
                   this.snake.head.y == this.food.pointer.y;
        }
        
        /**
         * Verifica se o score atual é melhor que o HighScore
         */
        private verifyAndChangeHighScore() 
        {
            if(this.highScore.isBestScore(this.snake.score.actual))
            {
                this.paintHighScore();
            }
        }
        
        /**
         * Verifica se a cobra não comeu a si mesmo no jogo
         */
        private checkCollision_old()
        {
            var _this = this;
            var ocurredCollision:boolean = false;
            this.snake.pointers.forEach(function(pointer) {
                if(pointer.x == _this.snake.face.x && pointer.y == _this.snake.face.y)
                {
                    ocurredCollision = true;
                }                    
            });
            return ocurredCollision;
        }
        
        /**
         * Verifica se a cobra não comeu a si mesmo no jogo
         */
        private checkCollision()
        {
            return this.matriz[this.snake.face.y][this.snake.face.x].whatIsIt == WhatIsThisTypes.Snake;
        }
        
        /**
         * "Move" a cobra, de maneira que não precise a sobrescrever totalmente
         */
        private mosey()
        {
            // Isto é, limpa o ultimo ponto da cobra(no caso o ponto que é anterior ao rabo)
            this.clearLastCell(); 
            // E depois, imprime o novo ponto da cobra(no caso o ponto que ficava após a cabeça[a face])
            this.paintCell(this.snake.face.x, this.snake.face.y);
        }
        
        /**
         * Metodo criado para gerenciar as alteções de ponteiros que acontecem no jogo
         */
        private changePointers()
        {
            var pointX:number, pointY:number;
            // Como este metodo é chamado, a cada alteração de ponteiro no jogo,
            // A primeira coisa que fazemos é verificar se o novo ponteiro não é uma comida,
            // logo verificamos se a cobra comeu ou não
            if(this.snakeEat())
            {
                // Se comeu:
                // - Adicionamos um ponto ao score
                this.snake.score.actual++;
                // - Criamos um novo ponto(celula) da comida
                this.matriz[this.food.pointer.y][this.food.pointer.x].whatIsIt = null;
                
                pointX = Math.round(Math.random()*(this.width));
                pointY = Math.round(Math.random()*(this.height));
                
                this.food.create_food(pointX, pointY);
                
                this.matriz[pointY][pointX].whatIsIt = WhatIsThisTypes.Food;
                
                
                // - E então imprimimos a mesma na tela
                this.paintFood();
                // Verifica se o score atual é maior que o highScore
                this.verifyAndChangeHighScore();                
                // Aumenta a velocidade da cobra
                this.speedUpSnake();    
            }
            else
            {
                // Se não comeu:
                // Retiro o ultimo ponto da cobra, e a coloco no ponto antes do rabo
                this.snake.before_tail = this.snake.pointers.pop(); //pops out the last cellWidth
                this.matriz[this.snake.before_tail.y][this.snake.before_tail.x].whatIsIt = WhatIsThisTypes.Null;
            }
            // E, em ambos os casos:
            // - Defino a cabeça da cobra como os pontos que seriam a face(que esta a frente da cabeça)
            this.snake.head = new Pointer(this.snake.face.x,this.snake.face.y, WhatIsThisTypes.Snake);
            // - Defino o rabo da cobra, como o ultimo ponto que esta no array
            this.snake.tail = this.snake.pointers[this.snake.pointers.length-1];
            // - Coloco a cabeça, acima de todos os itens do array de ponteiros da cobra
            this.snake.pointers.unshift(this.snake.head);
            this.matriz[this.snake.head.y][this.snake.head.x].whatIsIt = WhatIsThisTypes.Snake;
        }
        
        private speedUpSnake()
        {
            this.speed = ((100*this.speed)/Arena.MIN_SPEED)-5;      
            console.log(this.speed);      
        }
    }
}