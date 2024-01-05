import type { UserResolvable } from 'discord.js';
import type { AuthPermissions } from '@@types/auth.js';

export const ADMINISTRATOR_IDS: UserResolvable[] = [
    "163346982709100546"
];

export function getAuthPermissions(discordId: UserResolvable): AuthPermissions {
    if(ADMINISTRATOR_IDS.includes(discordId)) {
        return "ADMINISTRATOR";
    }

    return "USER";
};