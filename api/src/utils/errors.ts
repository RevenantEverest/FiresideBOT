import * as logs from './logs.js';
import * as colors from './colors.js';
import { errorTypes } from '../types/index.js';

type SendResponseOptions = errorTypes.SendResponseOptions;
type ErrorLogOptions = errorTypes.ErrorLogOptions;
type HandleTupleOptions<T> = errorTypes.HandleTupleOptions<T>;

export function sendResponse({ res, next, err, message }: SendResponseOptions): void {
    const logOptions: ErrorLogOptions = {
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

    if(next && err) {
        next(err);
    }
    else {
        res.status(500).json({ error: true, message });
    }
};

export function handleTuple<T>({res, err, errMsg}: HandleTupleOptions<T>): Error | undefined {    
    if(err) {
        return err;
    }
    else if(!res) {
        return new Error(errMsg);
    }
 
    return undefined;
};