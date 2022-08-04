import { AuthPayload } from './auth.js';

export interface ResponseLocalsParams {
    id?: number,
    guildId?: string,
    discordId?: string,
    playlistId?: number
};

export interface ResponseLocals {
    params?: ResponseLocalsParams,
    limit?: number,
    offset?: number
};

export interface AuthenticatedResponseLocals extends ResponseLocals {
    auth: AuthPayload
};