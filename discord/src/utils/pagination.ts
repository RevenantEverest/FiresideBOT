import { URLSearchParams } from 'url';
import { ApiPaginatedResponse } from '../types/api.js';
import { PartialApiPaginationOptions } from '../types/pagination.js';

import * as arrays from './arrays.js';

export function getPageIndex(paginationURL: string | null): number | null {
    if(!paginationURL) {
        return null;
    }

    const pathnameArr = paginationURL.split("/");
    const params = new URLSearchParams(pathnameArr[pathnameArr.length - 1]);
    const pageIndexStr = params.get("page");

    if(!pageIndexStr) {
        return null;
    }

    return parseInt(pageIndexStr, 10);
};

export function generateBasicPagiationOptions<T>(paginatedRes: ApiPaginatedResponse<T>): PartialApiPaginationOptions<T> {
    const hasMore = Boolean(paginatedRes.next);
    const data = arrays.generatedFixedArray<T>(paginatedRes.count, paginatedRes.results);
    const count = paginatedRes.count;

    return {
        hasMore, data, count
    };
};