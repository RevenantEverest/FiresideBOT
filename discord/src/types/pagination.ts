import { HandleReturn } from './promises.js';
import { PaginatedEmbed } from './embeds.js';

export interface PartialApiPaginationOptions<T> {
    hasMore: boolean,
    data: T[],
    count: number,
    requestedPages?: number[]
};

export interface ApiPaginationOptions<T> extends PartialApiPaginationOptions<T> {
    amountPerPage: number,
    getPage: (page: number, data: T[]) => HandleReturn<GetPageResponse<T>>,
};

export interface GetPageResponse<T> extends PartialApiPaginationOptions<T> {
    paginatedEmbed: PaginatedEmbed
}