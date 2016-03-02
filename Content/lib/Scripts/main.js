/// <reference path="Extensions/Jquery/jquery.d.ts" />
/// <reference path="Model/Snake.ts" />
/// <reference path="Model/Direction.ts" />
/// <reference path="Model/food.ts" />
/// <reference path="Model/Arena.ts" />
var arena = new Model.Arena();
$(document).ready(function () {
    //Lets save the cell width in a variable for easy control
    arena.cellWidth = 10;
    //Canvas stuff
    arena.own = $("#arena");
    arena.width = 50;
    arena.height = 40;
    arena.init();
    //Lets add the keyboard controls now
    $(document).keydown(function (e) {
        var key = e.which;
        //We will add another clause to prevent reverse gear
        if (key == 37 && arena.snake.direction != Model.Direction.right)
            arena.snake.direction = Model.Direction.left;
        else if (key == 38 && arena.snake.direction != Model.Direction.down)
            arena.snake.direction = Model.Direction.up;
        else if (key == 39 && arena.snake.direction != Model.Direction.left)
            arena.snake.direction = Model.Direction.right;
        else if (key == 40 && arena.snake.direction != Model.Direction.up)
            arena.snake.direction = Model.Direction.down;
        //The snake is now keyboard controllable 
    });
});