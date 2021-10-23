/* ===================================================
 * Classe criada para gerenciar e manipular comida
 * ===================================================*/
var Model;
(function (Model) {
    var Food = (function () {
        function Food(foodPointerX, foodPointerY) {
            this.create_food(foodPointerX, foodPointerY);
        }
        /**
         * Cria a comida em um ponto especifico, passado por parametro
         * no metodo
         */
        Food.prototype.create_food = function (foodPointerX, foodPointerY) {
            this.pointer = {
                x: foodPointerX,
                y: foodPointerY,
                whatIsIt: Model.WhatIsThisTypes.Food
            };
        };
        return Food;
    }());
    Model.Food = Food;
})(Model || (Model = {}));
