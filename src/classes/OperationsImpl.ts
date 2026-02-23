import type { Operations } from "../interfaces/Operations";

export class OperationsImpl implements Operations {
    expression: string;
    lastValue: number;
    
    constructor() {
        this.expression = "";
        this.lastValue = 0;
    }

    resolveExpression(): number {
        try {
            this.lastValue = eval(this.expression);
            return this.lastValue;
        } catch (error) {
            console.error("Error evaluating expression:", error);
            return NaN;
        }
    }
}