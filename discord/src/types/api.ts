export interface ApiPaginatedResponse<T> {
    count: number,
    next: string | null,
    previous: string | null,
    results: T[]
};

export interface ApiPaginationParams {
    page?: number
};