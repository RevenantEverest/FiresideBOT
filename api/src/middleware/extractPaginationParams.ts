import { Request, Response, NextFunction } from 'express';
import { DEFAULTS } from '../constants/index.js';

function extractPaginationParams(req:Request, res:Response, next:NextFunction) {

    const page: number = typeof req.query.page === "string" ? parseInt(req.query.page, 10) : 1;
    const limit: number = DEFAULTS.LIMIT;
    const offset: number = limit * (page - 1);

    res.locals.page = page;
    res.locals.limit = limit;
    res.locals.offset = offset;

    next();
};

export default extractPaginationParams;

