/// <reference path="../Extensions/Jquery/jquery.d.ts" />
/*
 * Arena
 */

module Model {    
    export class Arena {
        public own: JQuery;
        public width: number;
        public height: number;
        public cellWidth: number;
        public snake: Snake;
        public food: Food;
        public game_loop: any;
        
        constructor() {  
            this.food = new Food();
            this.snake = new Snake();
            console.log(this.snake);
            this.game_loop = undefined;
            this.own = null;          
        }
        
        /*
         * Inicia realmente a Arena, montando a mesma e iniciando o jogo   
         */
        public init()
        {
            var _this = this;
            
            this.food.create_food(Math.round(Math.random()*(this.width)), Math.round(Math.random()*(this.height)));
            
            this.paintArena();
            this.paintSnake();
            this.paintFood();
            
            this.game_loop = setInterval(function() {_this.paint();}, 50);            
        }
        
        /*
         * Reinicia a Arena, remontando a mesma e reiniciando o jogo   
         */
        public reinit()
        {
            var _this = this;
            this.snake = new Snake();
            this.cleanArena();
            this.paintSnake();
            this.paintFood();
            if(typeof this.game_loop != undefined) 
                clearInterval(this.game_loop);
            this.game_loop = setInterval(function() {_this.paint();}, 50);
        }
        
        /*
         * Desenha os personagens a tela   
         */
        private paint()
        {         
            if(this.snakeIsOut() || this.checkCollision())
            {
                //Lets organize the code a bit now.
                return;
            }
            
            this.changePointers();
            
            this.paintSnake();
            
            this.checkDirection();            
        }
        
        //Lets first create a generic function to paint cells
        private paintCell(x:number, y:number, cssClass:string = "activeSnake")
        {            
            this.own.find(".y"+y+" .x"+x).addClass(cssClass);
        }
        
        //Lets first create a generic function to paint cells
        private eraseCell(x:number, y:number, cssClass:string = "activeSnake")
        {
            this.own.find(".y"+y+" .x"+x).removeClass(cssClass);
        }
        
        private cleanArena()
        {
            this.own.find("tr td").removeClass("activeSnake");
            this.own.find("tr td").removeClass("activeFood");
        }
        
        private cleanSnake(cssClass:string = "activeSnake")
        {
            if(this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        }
        
        private cleanFood(cssClass:string = "activeFood")
        {
            if(this.own.find("tr td").hasClass(cssClass))
                this.own.find("tr td").removeClass(cssClass);
        }
        
        private paintArena() 
        {
            //Lets paint the canvas now
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
        
        private paintFood()
        {
            this.cleanFood();
            //Lets paint the food
            this.paintCell(this.food.pointer.x, this.food.pointer.y, "activeFood");
            //Lets paint the score
            $(".score").text(this.snake.score.toString());
        }
        
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
        }
        
        private clearLastCell()
        {
            this.eraseCell(this.snake.before_tail.x, this.snake.before_tail.y);
        }
        
        private checkDirection()
        {            
            if(this.snake.direction == Direction.left) this.snake.face.x--;
            else if(this.snake.direction == Direction.up) this.snake.face.y--;
            else if(this.snake.direction == Direction.down) this.snake.face.y++;
            else this.snake.face.x++;
        }
        
        private snakeIsOut() 
        {
            return this.snake.head.x == -1 || this.snake.head.x == this.width || 
                   this.snake.head.y == -1 || this.snake.head.y == this.height;
        }
        
        private snakeEat() 
        {
            return this.snake.head.x == this.food.pointer.x && 
                   this.snake.head.y == this.food.pointer.y;
        }
        
        private checkCollision()
        {
            var _this = this;
            var ocurredCollision:boolean = false;
            //This function will check if the provided x/y coordinates exist
            //in an array of cells or not
            this.snake.pointers.forEach(function(pointer) {
                if(pointer.x == _this.snake.face.x && pointer.y == _this.snake.face.y)
                    ocurredCollision = true;
            });            
            return ocurredCollision;
        }
        
        private mosey()
        {
            this.clearLastCell(); 
            //Lets paint 10px wide cells
            this.paintCell(this.snake.face.x, this.snake.face.y);
        }
        
        private changePointers()
        {            
            //Lets write the code to make the snake eat the this.food
            //The logic is simple
            //If the new head position matches with that of the this.food,
            //Create a new head instead of moving the tail
            if(this.snakeEat())
            {
                this.snake.head = this.snake.face;
                this.snake.score.actual++;
                //Create new this.food
                this.food.create_food(Math.round(Math.random()*(this.width)), Math.round(Math.random()*(this.height)));
                this.paintFood();
            }
            else
            {
                this.snake.before_tail = this.snake.pointers.pop(); //pops out the last cell 
                this.snake.head = new Pointer(this.snake.face.x,this.snake.face.y);                
            }
            
            this.snake.tail = this.snake.pointers[this.snake.pointers.length-1];
            
            this.snake.pointers.unshift(this.snake.head);            
        }        
    }
}