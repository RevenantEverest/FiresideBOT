import { QueryFailedError } from 'typeorm';

export type OperationReturn<T> = Promise<[T | undefined, Error | QueryFailedError | undefined]>;
export interface IndexOptions {
    offset?: number,
    limit?: number,
    count?: boolean,
    withoutPagination?: boolean
};