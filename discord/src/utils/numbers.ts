export function divideByLargerNumber(num1: number, num2: number): number {
    if(num2 > num1) {
        return num2 / num1;
    }

    return num1 / num2;
};

export function difference(num1: number, num2: number): number {
    if(num2 > num1) {
        return num2 - num1;
    }

    return num1 - num2;
};