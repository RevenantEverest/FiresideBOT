import { Request, Response } from 'express';
import { PaginationUrl, PaginatedResponse } from '../types/pagination.js';
import { ENV } from '../constants/index.js';

export function paginateResponse<T>(req: Request, res: Response, results: [T[], number]): PaginatedResponse<T> {

    const { page, limit } = res.locals;
    const regEx: RegExp = /(?=\?)(.*)/gi;
    const requestedUrl: string = req.originalUrl.replace(regEx, "");

    let count = results[1];
    let next: PaginationUrl = null;
    let prev: PaginationUrl = null;

    if((page * limit) < count) {
        next = ENV.BASE_URL! + requestedUrl + `?page=${page + 1}`;
    }

    if(page > 1) {
        prev = ENV.BASE_URL! + requestedUrl + `?page=${page - 1}`;
    }

    return {
        count: count,
        next: next,
        previous: prev,
        results: results[0]
    };
};