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
        
        public init()
        {            
            this.snake.direction = Direction.right; //default direction
            this.food.create_food(Math.round(Math.random()*(this.width)), Math.round(Math.random()*(this.height)));
            this.paintArena();
            this.reinit();            
        }
        
        public reinit()
        {
            var _this = this;            
            //Lets move the snake now using a timer which will trigger the paint function
            //every 60ms
            this.snake = new Snake();
            this.cleanArena();
            this.paintSnake();
            this.paintFood();
            if(typeof this.game_loop != "undefined") 
                clearInterval(this.game_loop);
            this.game_loop = setInterval(function() {_this.paint();}, 60);
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
            this.own.find("tr td").removeClass();
        }
        
        private cleanSnake(cssClass:string = "activeSnake")
        {
            this.own.find("tr td").removeClass(cssClass);
        }
        
        private cleanFood(cssClass:string = "activeFood")
        {
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
            this.paintArena();
            //Lets paint the food
            this.paintCell(this.food.pointer.x, this.food.pointer.y, "activeFood");
            //Lets paint the score
            $(".score").text(this.snake.score.toString());
        }
        
        private paintSnake()
        {
            var _this = this;
            if(this.own.find("tr td.active").length === this.snake.pointers.length)
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
            if(this.snake.direction == Direction.right) this.snake.face.x++;
            else if(this.snake.direction == Direction.left) this.snake.face.x--;
            else if(this.snake.direction == Direction.up) this.snake.face.y--;
            else if(this.snake.direction == Direction.down) this.snake.face.y++;
        }
        
        private snakeIsOut() 
        {
            return this.snake.head.x == -1 || this.snake.head.x == this.width|| 
                   this.snake.head.y == -1 || this.snake.head.y == this.height;
        }
        
        private checkCollision()
        {
            var _this = this;
            //This function will check if the provided x/y coordinates exist
            //in an array of cells or not
            this.snake.pointers.forEach(function(pointer) {
                if(pointer.x == _this.snake.face.x && pointer.y == _this.snake.face.y)
                    return true;
            });            
            return false;
        }
        
        private mosey()
        {
            this.clearLastCell(); 
            //Lets paint 10px wide cells
            this.paintCell(this.snake.face.x, this.snake.face.y);
        }        
        
        //Lets paint the snake now
        private paint()
        {            
            //These were the position of the head cell.
            //We will increment it to get the new head position
            //Lets add proper direction based movement now
            this.snake.tail = this.snake.pointers[this.snake.pointers.length-1];
            this.checkDirection();
            
            //Lets add the game over clauses now
            //This will restart the game if the snake hits the wall
            //Lets add the code for body collision
            //Now if the head of the snake bumps into its body, the game will restart
            if(this.snakeIsOut() || this.checkCollision())
            {
                //restart game
                this.reinit();
                //Lets organize the code a bit now.
                return;
            }
            
            //Lets write the code to make the snake eat the this.food
            //The logic is simple
            //If the new head position matches with that of the this.food,
            //Create a new head instead of moving the tail
            if(this.snake.head.x == this.food.pointer.x && this.snake.head.y == this.food.pointer.y)
            {
                this.snake.head = this.snake.face;
                this.snake.score.actual++;
                //Create new this.food
                this.food.create_food(Math.round(Math.random()*(this.width)), Math.round(Math.random()*(this.height)));
                this.paintFood();
            }
            else
            {
                this.snake.before_tail = this.snake.tail;
                this.snake.tail = this.snake.pointers.pop(); //pops out the last cell
                this.snake.head = this.snake.face;                
            }
            
            this.snake.pointers.unshift(this.snake.head);                       
            this.paintSnake();
            console.log(this);
            
            setTimeout(function() {
                debugger;
            }, 10000);
        }        
    }
}