import { promiseTypes } from '../types/index.js';

export async function handle<T>(promise: Promise<T>): Promise<promiseTypes.HandleReturn<T>> {
    return promise
    .then((results: T) => {
        return [results, undefined] as [T, undefined];
    })
    .catch((err: Error) => {
        return [undefined, err]
    });
};  