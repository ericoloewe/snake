/*
 * Arena
 */

module Model {    
    export class Arena {
        public canvas: any;
        public context: any;
        public width: number;
        public height: number;
        public cellWidth: number;
        public snake: Snake;
        public food: Food;
        public game_loop: any;
        
        constructor() {  
            this.food = new Food();
            this.snake = new Snake();
            this.game_loop = undefined;
            this.canvas = null;
            this.context = null;            
        }
        
        public init()
        {            
            this.snake.direction = Direction.right; //default direction
            this.food.create_food(Math.round(Math.random()*(this.width-this.cellWidth)/this.cellWidth), Math.round(Math.random()*(this.height-this.cellWidth)/this.cellWidth));
            this.paintArena();
            this.paintCompleteSnake();
            this.paintFood();
            this.paint();            
        }
        
        public reinit()
        {
            var _this = this;            
            //Lets move the snake now using a timer which will trigger the paint function
            //every 60ms
            if(typeof this.game_loop != "undefined") 
                clearInterval(this.game_loop);
            this.game_loop = setInterval(function() {_this.paint();}, 60);
        }
        
        //Lets first create a generic function to paint cells
        private paintCell(x:number, y:number, colorFill:string = "blue", colorStroke:string = "white")
        {
            this.context.fillStyle = colorFill;
            this.context.fillRect(x*this.cellWidth, y*this.cellWidth, this.cellWidth, this.cellWidth);
            this.context.strokeStyle = colorStroke;
            this.context.strokeRect(x*this.cellWidth, y*this.cellWidth, this.cellWidth, this.cellWidth);
        }
        
        private paintArena() {
            //Lets paint the canvas now
            this.context.fillStyle = "white";
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.strokeStyle = "black";
            this.context.strokeRect(0, 0, this.width, this.height);
        }
        
        private paintCompleteSnake()
        {
            //paint the snake
            for(var i = 0; i < this.snake.pointers.length; i++)
            {
                var c = this.snake.pointers[i];
                //Lets paint 10px wide cells
                this.paintCell(c.x, c.y);
            }
        }
        
        private paintSnake()
        {
            //Lets paint 10px wide cells
            this.paintCell(this.snake.face.x, this.snake.face.y);
        }
        
        private paintFood()
        {
            this.paintArena();
            //Lets paint the food
            this.paintCell(this.food.pointer.x, this.food.pointer.y);
            //Lets paint the score
            this.context.fillText(this.snake.score.toString(), 5, this.height-5);
        }
        
        //Lets paint the snake now
        private paint()
        {            
            //These were the position of the head cell.
            //We will increment it to get the new head position
            //Lets add proper direction based movement now
            this.snake.before_tail = this.snake.pointers[this.snake.pointers.length-1];
            this.checkDirection();
            
            //Lets add the game over clauses now
            //This will restart the game if the snake hits the wall
            //Lets add the code for body collision
            //Now if the head of the snake bumps into its body, the game will restart
            if(this.snakeIsOver() || this.checkCollision())
            {
                //restart game
                this.reinit();
                //Lets organize the code a bit now.
                return;
            }
            console.log(this.snake);
            
            //Lets write the code to make the snake eat the this.food
            //The logic is simple
            //If the new head position matches with that of the this.food,
            //Create a new head instead of moving the tail
            if(this.snake.face.x == this.food.pointer.x && this.snake.face.y == this.food.pointer.y)
            {
                this.snake.head = this.snake.face;
                this.snake.score.actual++;
                //Create new this.food
                this.food.create_food(Math.round(Math.random()*(this.width-this.cellWidth)/this.cellWidth), Math.round(Math.random()*(this.height-this.cellWidth)/this.cellWidth));
                this.paintFood();
            }
            else
            {
                this.snake.tail = this.snake.pointers.pop(); //pops out the last cell
                this.snake.head = this.snake.face; 
            }
            //The snake can now eat the food.            
            this.snake.pointers.unshift(this.snake.head); //puts back the tail as the first cell
            
            this.clearLastCell();
            
            this.paintSnake();            
            
            console.log(this.snake.head);
            console.log(this.snake.tail);   
            console.log(this.snake);         
        }
        
        private clearLastCell()
        {
            this.paintCell(this.snake.before_tail.x, this.snake.before_tail.y, "white");
        }
        
        private checkDirection()
        {
            if(this.snake.direction == Direction.right) this.snake.face.x++;
            else if(this.snake.direction == Direction.left) this.snake.face.x--;
            else if(this.snake.direction == Direction.up) this.snake.face.y--;
            else if(this.snake.direction == Direction.down) this.snake.face.y++;
        }
        
        private snakeIsOver() 
        {
            return this.snake.face.x == -1 || this.snake.face.x == this.width/this.cellWidth || 
                   this.snake.face.y == -1 || this.snake.face.y == this.height/this.cellWidth;
        }
        
        private checkCollision()
        {
            var array = this.snake.pointers;
            //This function will check if the provided x/y coordinates exist
            //in an array of cells or not
            for(var i = 0; i < array.length; i++)
            {
                if(array[i].x == this.snake.face.x && array[i].y == this.snake.face.y)
                    return true;
            }
            return false;
        }
    }
}