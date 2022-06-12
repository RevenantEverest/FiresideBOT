import { QueryFailedError } from 'typeorm';

export type HandleReturn<T> = Promise<[T | null | undefined, Error | QueryFailedError | undefined]>;