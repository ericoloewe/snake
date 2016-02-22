/*
 * Arena
 */
var Model;
(function (Model) {
    var Arena = (function () {
        function Arena() {
        }
        //Lets first create a generic function to paint cells
        Arena.prototype.paint_cell = function (x, y) {
            this.context.fillStyle = "blue";
            this.context.fillRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
            this.context.strokeStyle = "white";
            this.context.strokeRect(x * this.cellWidth, y * this.cellWidth, this.cellWidth, this.cellWidth);
        };
        return Arena;
    })();
    Model.Arena = Arena;
})(Model || (Model = {}));
