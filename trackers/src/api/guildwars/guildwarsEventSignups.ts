import { UserResolvable } from 'discord.js';

import { HandleAxiosReturn } from '../../types/promises.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';

import { GuildWarsEventSignUp } from '../../types/entities/GuildWarsEventSignUp.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<GuildWarsEventSignUp>>;

const baseEndpoint = ENV.API_URL + "/guildwars/events/signups";

export async function getByEventNameAndTime(eventName: string, eventTime: string, params?: ApiPaginationParams): PaginatedResponse {
     const endpoint = `${baseEndpoint}/name/${eventName}/time/${eventTime}?page=${params?.page ?? 1}`;
     return apiRequests.paginatedRequest({
        endpoint,
        method: "get"
     });
};