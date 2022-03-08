import * as logs from './logs.js';
import * as colors from './colors.js';
import { errorTypes } from '../types/index.js';

export function sendResponse({ res, next, err, message }: errorTypes.SendResponseOptions) {
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

    if(next && err) {
        next(err);
    }
    else {
        res.status(500).json({ error: true, message });
    }
};