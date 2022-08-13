import { URLSearchParams } from 'url';
import { ApiPaginatedResponse } from '../types/api.js';
import { PartialApiPaginationOptions } from '../types/pagination.js';

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
    const data = paginatedRes.results;
    const count = paginatedRes.count;
    const nextPageIndex = getPageIndex(paginatedRes.next);
    const prevPageIndex = getPageIndex(paginatedRes.previous);

    return {
        hasMore, data, count, nextPageIndex, prevPageIndex
    };
};