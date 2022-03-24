import { Response, NextFunction } from 'express';

export interface SendResponseOptions {
    res: Response,
    next?: NextFunction,
    err?: Error,
    message?: string
};

export interface ErrorLogOptions {
    color: string | number,
    message?: string,
    err?: Error 
};

export interface HandleTupleOptions<T> {
    res: T | undefined,
    err: Error | undefined,
    errMsg: string
};