import { promiseTypes } from '../types/index.js';

type HandleReturn<T> = promiseTypes.HandleReturn<T>;

export async function handle<T>(promise: Promise<T>): HandleReturn<T> {
    return promise
    .then((results: T) => {
        return [results, undefined] as [T, undefined];
    })
    .catch((err: Error) => {
        return [undefined, err]
    });
};