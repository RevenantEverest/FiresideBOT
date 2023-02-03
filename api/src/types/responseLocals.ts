import { Response } from 'express';
import { AuthPayload } from './auth.js';

export interface ResponseLocalsParams {
    id?: number,
    guildId?: string,
    discordId?: string,
    roleId?: string,
    playlistId?: number
};

export interface ResponseLocals {
    params?: ResponseLocalsParams,
    expand?: string[],
    limit?: number,
    offset?: number
};

export interface AuthenticatedResponseLocals extends ResponseLocals {
    auth: AuthPayload
};

export interface AuthenticatedResponse extends Response {
    locals: AuthenticatedResponseLocals
};