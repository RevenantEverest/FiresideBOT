import { UserResolvable } from 'discord.js';

import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';

import { GuildWarsEventSignUp, GuildWarsEventSignUpCreate } from '../../types/entities/GuildWarsEventSignUp.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<GuildWarsEventSignUp>>;

const baseEndpoint = ENV.API_URL + "/guildwars/events/signups";

export async function getByDiscordId(dispatch: CommandDispatch, discordId: UserResolvable, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/discord_id/${discordId}?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest<GuildWarsEventSignUp>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function getOne(dispatch: CommandDispatch, id: number): HandleAxiosReturn<GuildWarsEventSignUp> {
    const endpoint = `${baseEndpoint}/id/${id}`;
    return apiRequests.request<GuildWarsEventSignUp>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function create(dispatch: CommandDispatch, eventSignup: GuildWarsEventSignUpCreate): HandleAxiosReturn<GuildWarsEventSignUp> {
    const endpoint = `${baseEndpoint}/`;
    return apiRequests.request<GuildWarsEventSignUp, GuildWarsEventSignUpCreate>({
        dispatch,
        endpoint,
        method: "post",
        data: {
            discord_id: eventSignup.discord_id,
            event_name: eventSignup.event_name,
            event_time: eventSignup.event_time,
            timezone: eventSignup.timezone
        }
    });
};

export async function destroy(dispatch: CommandDispatch, eventSignup: GuildWarsEventSignUp): HandleAxiosReturn<GuildWarsEventSignUp> {
    const endpoint = `${baseEndpoint}/id/${eventSignup.id}`;
    return apiRequests.request({
        dispatch,
        endpoint,
        method: "delete"
    });
};