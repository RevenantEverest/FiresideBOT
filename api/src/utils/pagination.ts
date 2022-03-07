import { Request, Response } from 'express';
import { paginationTypes } from '../types/index.js';

function paginateResponse(req: Request, res: Response, results:Array<Object|Number>): Object {

    const { page, limit } = res.locals;
    const regEx:RegExp = /(?=\?)(.*)/gi;
    const requestedUrl:String = req.originalUrl.replace(regEx, "");

    let count = results[1];
    let next:paginationTypes.PaginationUrl = null;
    let prev:paginationTypes.PaginationUrl = null;

    if((page * limit) < count) {
        next = process.env.BASE_URL! + requestedUrl + `?page=${page + 1}`;
    }

    if(page > 1) {
        prev = process.env.BASE_URL! + requestedUrl + `?page=${page - 1}`;
    }

    return {
        count: count,
        next: next,
        previous: prev,
        results: results[0]
    };
};

export default { paginateResponse };