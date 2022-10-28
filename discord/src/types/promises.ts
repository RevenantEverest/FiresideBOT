import { AxiosApiError } from './api.js';

export type HandleReturn<T> = Promise<[T | undefined, Error | undefined]>;
export type HandleAxiosReturn<T> = Promise<[T | undefined, AxiosApiError | undefined]>;