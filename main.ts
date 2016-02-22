/// <reference path="Extensions/Jquery/jquery.d.ts" />
/// <reference path="Model/Snake.ts" />
/// <reference path="Model/Direction.ts" />
/// <reference path="Model/Food.ts" />
/// <reference path="Model/Arena.ts" />

var snake = new Model.Snake();
var food = new Model.Food();
var arena = new Model.Arena();

$(document).ready(function(){
    //Canvas stuff
    arena.canvas = $("#canvas")[0];
    arena.context = arena.canvas.getContext("2d");    
    arena.width = arena.canvas.width;
    arena.height = arena.canvas.height;
    
    //Lets save the cell width in a variable for easy control
    var cw = 10;
    
    function init()
    {
        snake.direction = Model.Direction.right; //default direction
        food.create_food(Math.round(Math.random()*(arena.width-cw)/cw), Math.round(Math.random()*(arena.height-cw)/cw));
        //finally lets display the score
        snake.score = 0;
        
        //Lets move the snake now using a timer which will trigger the paint function
        //every 60ms
        if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, 60);
    }
    
    init();
    
    //Lets paint the snake now
    function paint()
    {
        //To avoid the snake trail we need to paint the BG on every frame
        //Lets paint the canvas now
        arena.context.fillStyle = "white";
        arena.context.fillRect(0, 0, arena.width, arena.height);
        arena.context.strokeStyle = "black";
        arena.context.strokeRect(0, 0, arena.width, arena.height);
        
        //The movement code for the snake to come here.
        //The logic is simple
        //Pop out the tail cell and place it infront of the head cell
        var nx = snake.pointers[0].x;
        var ny = snake.pointers[0].y;
        //These were the position of the head cell.
        //We will increment it to get the new head position
        //Lets add proper direction based movement now
        if(snake.direction == Model.Direction.right) nx++;
        else if(snake.direction == Model.Direction.left) nx--;
        else if(snake.direction == Model.Direction.up) ny--;
        else if(snake.direction == Model.Direction.down) ny++;
        
        //Lets add the game over clauses now
        //This will restart the game if the snake hits the wall
        //Lets add the code for body collision
        //Now if the head of the snake bumps into its body, the game will restart
        if(nx == -1 || nx == arena.width/cw || ny == -1 || ny == arena.height/cw || check_collision(nx, ny, snake))
        {
            //restart game
            init();
            //Lets organize the code a bit now.
            return;
        }
        
        //Lets write the code to make the snake eat the food
        //The logic is simple
        //If the new head position matches with that of the food,
        //Create a new head instead of moving the tail
        var tail = {x:null, y:null};
        if(nx == food.pointers.x && ny == food.pointers.y)
        {
            tail = {x: nx, y: ny};
            snake.score++;
            //Create new food
            food.create_food(Math.round(Math.random()*(arena.width-cw)/cw), Math.round(Math.random()*(arena.height-cw)/cw));
        }
        else
        {
            tail = snake.pointers.pop(); //pops out the last cell
            tail.x = nx; tail.y = ny;
        }
        //The snake can now eat the food.
        
        snake.pointers.unshift(tail); //puts back the tail as the first cell
        
        for(var i = 0; i < snake.pointers.length; i++)
        {
            var c = snake.pointers[i];
            //Lets paint 10px wide cells
            paint_cell(c.x, c.y);
        }
        
        //Lets paint the food
        paint_cell(food.pointers.x, food.pointers.y);
        //Lets paint the score
        var score_text = "Score: " + snake.score;
        arena.context.fillText(score_text, 5, arena.height-5);
    }
    
    //Lets first create a generic function to paint cells
    function paint_cell(x, y)
    {
        arena.context.fillStyle = "blue";
        arena.context.fillRect(x*cw, y*cw, cw, cw);
        arena.context.strokeStyle = "white";
        arena.context.strokeRect(x*cw, y*cw, cw, cw);
    }
    
    function check_collision(x, y, snake)
    {
        var array = snake.pointers;
        //This function will check if the provided x/y coordinates exist
        //in an array of cells or not
        for(var i = 0; i < array.length; i++)
        {
            if(array[i].x == x && array[i].y == y)
            return true;
        }
        return false;
    }        
    
    //Lets add the keyboard controls now
    $(document).keydown(function(e){
        var key = e.which;
        //We will add another clause to prevent reverse gear
        if(key == 37 && snake.direction != Model.Direction.right) snake.direction = Model.Direction.left;
        else if(key == 38 && snake.direction != Model.Direction.down) snake.direction = Model.Direction.up;
        else if(key == 39 && snake.direction != Model.Direction.left) snake.direction = Model.Direction.right;
        else if(key == 40 && snake.direction != Model.Direction.up) snake.direction = Model.Direction.down;
        //The snake is now keyboard controllable
    })

})