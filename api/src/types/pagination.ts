export type PaginationUrl = string | null;
export interface PaginatedResponse<T> {
    count: number,
    next: PaginationUrl,
    previous: PaginationUrl,
    results: T[]
};