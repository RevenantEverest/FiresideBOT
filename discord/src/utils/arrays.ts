export function generatedFixedArray<T>(length: number, initialData: T[]): T[] {
    const arr = new Array(length).fill(undefined);

    for(let i = 0; i < initialData.length; i++) {
        arr[i] = initialData[i];
    }

    return Object.seal<T[]>(arr);
};

export function replaceElements<T>(arr: T[], startIndex: number, data: T[]): T[] {

    for(let i = 0; i < data.length; i++) {
        arr[startIndex + i] = data[i];
    };

    return arr;
};


