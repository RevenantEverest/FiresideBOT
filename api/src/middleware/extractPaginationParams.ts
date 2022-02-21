import { Request, Response, NextFunction } from 'express';
import { DEFAULTS } from '../constants/index.js';

function extractPaginationParams(req:Request, res:Response, next:NextFunction) {
    
    let page:number = 1;
    let limit:number = DEFAULTS.LIMIT;
    let offset:number = 0;

    if(req.query && typeof req.query.page === "string") {
        page = parseInt(req.query.page, 10);
    }

    if(page < 1) {
        page = 1;
    }

    if(page === 2) {
        offset = limit;
    }

    if(page > 2) {
        offset = limit * page;
    }

    res.locals.page = page;
    res.locals.limit = limit;
    res.locals.offset = offset;

    next();
};

export default extractPaginationParams;

