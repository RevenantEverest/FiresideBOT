import { Response, NextFunction } from 'express';
import * as logs from './logs.js';
import * as colors from './colors.js';
import { errorTypes } from '../types/index.js';

export function promiseError({ next, err, message }: errorTypes.PromiseErrorOptions) {
    if(message) {
        logs.error({ color: colors.error, message: message, err });
    }

    next(err);
};

export function internalErrorResponse({ res, err, message }: errorTypes.InternalErrorResponseOptions) {
    const logOptions: errorTypes.ErrorLogOptions = {
        color: colors.error
    };

    if(err) {
        logOptions.err = err;
    }

    if(message) {
        logOptions.message = message;    
    }
    
    if(err || message) {
        logs.error(logOptions);
    }

    res.status(500).json({ error: true, message: message });
};