/*
 * Score
 */

module Model {
    export class Score {
        public actual: number;
        
        constructor() {
            this.actual = 0;
        }
        
        public toString() {
            return "Score: " + this.actual;
        }
    }
}