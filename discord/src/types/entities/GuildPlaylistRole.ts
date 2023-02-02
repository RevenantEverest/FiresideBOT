import { RoleResolvable } from 'discord.js';

export interface GuildPlaylistRole {
    id: number,
    role_id: RoleResolvable,
    created_at: Date
};

export interface GuildPlaylistRoleCreate {
    playlist_id: number,
    role_id: RoleResolvable
};