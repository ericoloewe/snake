/**
 * Food
 */

module Model {
    export class Food {
        public pointer: Pointer;
        
        constructor();
        constructor(foodPointerX: number, foodPointerY: number);
        constructor(foodPointerX?: number, foodPointerY?: number) {
            this.create_food(foodPointerX, foodPointerY);
        }
        
        //Lets create the food now
        public create_food(foodPointerX: number, foodPointerY: number)
        {
            this.pointer = {
                x: foodPointerX, 
                y: foodPointerY, 
            };
            //This will create a cell with x/y between 0-44
            //Because there are 45(450/10) positions accross the rows and columns
        }
    }
}