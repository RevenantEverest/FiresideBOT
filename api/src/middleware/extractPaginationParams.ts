import { Request, Response, NextFunction } from 'express';
import { DEFAULTS } from '../constants/index.js';

function extractPaginationParams(req:Request, res:Response, next:NextFunction) {
    
    let page = 0;
    let limit = DEFAULTS.LIMIT;

    if(req.query && typeof req.query.page === "string") {
        page = parseInt(req.query.page, 10);
    }

    if(req.query && typeof req.query.limit === "string") {
        limit = parseInt(req.query.limit, 10);
    }

    res.locals.page = page;
    res.locals.limit = limit;

    next();
};

export default extractPaginationParams;

