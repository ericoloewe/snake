/// <reference path="Extensions/Jquery/jquery.d.ts" />
/// <reference path="Model/Snake.ts" />
/// <reference path="Model/Direction.ts" />
/// <reference path="Model/food.ts" />
/// <reference path="Model/Arena.ts" />

// Controi a varivel para gerenciar a Arena
var arena = new Model.Arena();

$(document).ready(function(){
    // Grava o tamanho da celula(ponteiro) para controle
    arena.cellWidth = 10;
    
    // Define quem é a Arena no html
    arena.own = $(".arena");
    // Define a largura que a arena vai ter
    arena.width = 50;
    // Define a altura que a arena vai ter
    arena.height = 40;
    
    // E então finalmente inicia a Arena, 
    // fazendo assim com que o jogo inicie
    arena.init();
        
    /**
     * Gerencia as teclas tecladas para o jogo
     */
    $(document).keydown(function(e){
        var key = e.which;
        // Verifica quando as setas serão clicadas
        if(key == 37 && arena.snake.direction != Model.Direction.right) arena.snake.direction = Model.Direction.left;
        else if(key == 38 && arena.snake.direction != Model.Direction.down) arena.snake.direction = Model.Direction.up;
        else if(key == 39 && arena.snake.direction != Model.Direction.left) arena.snake.direction = Model.Direction.right;
        else if(key == 40 && arena.snake.direction != Model.Direction.up) arena.snake.direction = Model.Direction.down;
        // Agora a cobra(personagem) esta controlavel
    })
 
})