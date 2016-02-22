/**
 * Direction
 */
var Model;
(function (Model) {
    (function (Direction) {
        Direction[Direction["right"] = 0] = "right";
        Direction[Direction["left"] = 1] = "left";
        Direction[Direction["up"] = 2] = "up";
        Direction[Direction["down"] = 3] = "down";
    })(Model.Direction || (Model.Direction = {}));
    var Direction = Model.Direction;
})(Model || (Model = {}));
