import { Response, NextFunction } from 'express';

export interface PromiseErrorOptions {
    next: NextFunction,
    err: Error,
    message?: string
};

export interface InternalErrorResponseOptions {
    res: Response,
    err?: Error,
    message?: string
};

export interface ErrorLogOptions {
    color: string | number,
    message?: string,
    err?: Error 
};