export interface Operations {
    expression: string;
    lastValue: number;

    resolveExpression(): number;
}