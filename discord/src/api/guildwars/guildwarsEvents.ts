import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';

import { GuildWarsEvent } from '../../types/guildwarsEvents.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<GuildWarsEvent>>;

const baseEndpoint = ENV.API_URL + "/guildwars/events";

export async function getUpcoming(dispatch: CommandDispatch, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/upcoming?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function search(dispatch: CommandDispatch, searchParams: string, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/search/${searchParams ?? ""}?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function index(dispatch: CommandDispatch, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function getByCategory(dispatch: CommandDispatch, category: string): HandleAxiosReturn<GuildWarsEvent> {
    const endpoint = `${baseEndpoint}/category/${category}`;
    return apiRequests.request<GuildWarsEvent>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function getByEventName(dispatch: CommandDispatch, eventName: string): HandleAxiosReturn<GuildWarsEvent> {
    const endpoint = `${baseEndpoint}/name/${eventName}`;
    return apiRequests.request<GuildWarsEvent>({
        dispatch,
        endpoint,
        method: "get"
    });
};