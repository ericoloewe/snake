/**
 * Food
 */
var Model;
(function (Model) {
    var Food = (function () {
        function Food(foodPointerX, foodPointerY) {
            this.create_food(foodPointerX, foodPointerY);
        }
        //Lets create the food now
        Food.prototype.create_food = function (foodPointerX, foodPointerY) {
            this.pointers = {
                x: foodPointerX,
                y: foodPointerY,
            };
            //This will create a cell with x/y between 0-44
            //Because there are 45(450/10) positions accross the rows and columns
        };
        return Food;
    })();
    Model.Food = Food;
})(Model || (Model = {}));
