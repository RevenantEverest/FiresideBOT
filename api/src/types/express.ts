import type { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
    NextFunction as ExpressNextFunction 
} from 'express';
import type { AuthPayload } from './auth.js';

export interface LocalsPagination {
    page: number,
    limit: number,
    offset: number
};

export interface Locals<T> {
    pagination: LocalsPagination, 
    auth: AuthPayload,
    params: T
};

export type AuthenticatedResponse<T = any> = ExpressResponse<any, Pick<Locals<T>, "auth" | "params">>;
export type PaginatedResponse<T = any> = ExpressResponse<any, Pick<Locals<T>, "pagination">>;
export type AuthenticatedPaginatedResponse<T = any> = ExpressResponse<any, Locals<T>>;

export type APResponse = AuthenticatedPaginatedResponse;

export type Request<T = any, D = any> = ExpressRequest<D, any, T>;
export type Response<T = any> = ExpressResponse<any, Partial<Locals<T>>>;
export type NextFunction = ExpressNextFunction;