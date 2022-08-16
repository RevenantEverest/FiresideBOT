import { URLSearchParams } from 'url';
import { ApiPaginatedResponse } from '../types/api.js';
import { PartialApiPaginationOptions, GetPageResponse } from '../types/pagination.js';
import { PaginatedEmbed } from '../types/embeds.js';

import * as arrays from './arrays.js';
import { DEFAULTS } from '../constants/index.js';

interface FormatGetPageResponseParams<T> {
    page: number,
    data: T[],
    paginatedRes: ApiPaginatedResponse<T>,
    generatePaginatedEmbed: (data: T[]) => PaginatedEmbed
};

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

export function formatGetPageResponse<T>({ page, data, paginatedRes, generatePaginatedEmbed }: FormatGetPageResponseParams<T>): GetPageResponse<T> {
    const maxDataFromPage = page * DEFAULTS.API_PAGINATION.LIMIT;
    const spliceStartIndex = Math.ceil(maxDataFromPage - DEFAULTS.API_PAGINATION.LIMIT);
    paginatedRes.results = arrays.replaceElements(data, spliceStartIndex, paginatedRes.results);

    const partialOptions = generateBasicPagiationOptions<T>(paginatedRes);

    return {
        ...partialOptions,
        paginatedEmbed: generatePaginatedEmbed(data)
    };
};