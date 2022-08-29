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

export function shuffle<T>(arr: T[]): T[] {
    for(let i = arr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const element = arr[i];

        arr[i] = arr[randomIndex];
        arr[randomIndex] = element;
    };

    return arr;
};


