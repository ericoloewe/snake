
/* ===================================================
 * Classe criada para gerenciar e manipular comida
 * ===================================================*/
module Model {
    export class Food {
        public pointer: Pointer;
        
        constructor();
        constructor(foodPointerX: number, foodPointerY: number);
        constructor(foodPointerX?: number, foodPointerY?: number) {
            this.create_food(foodPointerX, foodPointerY);
        }
        
        /**
         * Cria a comida em um ponto especifico, passado por parametro
         * no metodo   
         */
        public create_food(foodPointerX: number, foodPointerY: number)
        {
            this.pointer = {
                x: foodPointerX, 
                y: foodPointerY, 
                whatIsIt: WhatIsThisTypes.Food
            };
        }
    }
}