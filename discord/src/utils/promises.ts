import { HandleReturn } from '../types/promises.js';

export async function handle<T>(promise: Promise<T>): HandleReturn<T> {
    return promise
    .then((results: T) => {
        return [results, undefined] as [T, undefined];
    })
    .catch((err: Error) => {
        return [undefined, err]
    });
};

export async function waitFor(conditionFunction: () => boolean, intervalLength?: number) {
    const poll = (resolve: (value?: unknown) => void) => {
        if(conditionFunction()) {
            resolve();
        }
        else {
            setTimeout(() => poll(resolve), intervalLength ?? 400);
        }
    };

    return new Promise(poll);
};