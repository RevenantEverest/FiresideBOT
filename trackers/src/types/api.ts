import { AxiosError, AxiosResponse } from 'axios';

export interface ApiPaginatedResponse<T> {
    count: number,
    next: string | null,
    previous: string | null,
    results: T[]
};

export interface ApiPaginationParams {
    page?: number
};

export interface ApiErrorResponse {
    error: boolean,
    message: string
};

export interface ApiResponse<T> {
    results: T
};

export type AxiosApiResponse<T> = AxiosResponse<ApiResponse<T>>;
export type AxiosPaginatedApiResponse<T> = AxiosResponse<ApiPaginatedResponse<T>>;
export type AxiosApiError = AxiosError<ApiErrorResponse>;