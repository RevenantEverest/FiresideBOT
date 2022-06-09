export type OperationReturn<T> = Promise<[T | undefined, Error | undefined]>;
export interface IndexOptions {
    offset?: number,
    limit?: number,
    count?: boolean,
    withoutPagination?: boolean
};