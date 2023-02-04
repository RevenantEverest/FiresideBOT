import { PermissionString } from 'discord.js';

export interface Flag {
    name: string,
    usageSymbol: string[],
    permissions: PermissionString[],
    description: string,
    example: string
};