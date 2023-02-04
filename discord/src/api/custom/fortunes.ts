import { GuildResolvable } from 'discord.js';
import { CommandDispatch } from '../../types/commands.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';
import { Fortune } from '../../types/entities/Fortune.js';
import { HandleReturn } from '../../types/promises.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

const baseEndpoint = ENV.API_URL + "/custom/fortunes";

type PaginatedResponse = HandleReturn<ApiPaginatedResponse<Fortune>>;

export async function getByGuildId(guildId: GuildResolvable, dispatch: CommandDispatch, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/guild/${guildId}/?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest<Fortune>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function create(guildId: GuildResolvable, dispatch: CommandDispatch, fortune: string): HandleReturn<Fortune> {
    const endpoint = `${baseEndpoint}/guild/${guildId}`;
    return apiRequests.request<Fortune, { fortune: string }>({
        dispatch,
        endpoint,
        method: "post",
        data: {
            fortune
        }
    });
};

export async function destroy(guildId: GuildResolvable, dispatch: CommandDispatch, fortuneId: number): HandleReturn<Fortune> {
    const endpoint = `${baseEndpoint}/guild/${guildId}/id/${fortuneId}`;
    return apiRequests.request<Fortune>({
        dispatch,
        endpoint,
        method: "delete"
    });
};