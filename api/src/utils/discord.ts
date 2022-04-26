import { 
    AnyChannel, 
    TextChannel, 
    Guild, 
    GuildMember,
    PermissionResolvable
} from 'discord.js';
import bot from '../discordBot.js';

import * as promises from './promises.js';

import { TextChannelReturn, CheckGuildMemberPermissionsOptions } from '../types/discord';
import { HandleReturn } from '../types/promises.js';

type CheckPermissionsReturn = Promise<HandleReturn<boolean>>;

export async function getTextChannel(channelId: string): TextChannelReturn {
    try {
        const channel = await bot.channels.fetch(channelId) as AnyChannel;

        if(channel.type !== "GUILD_TEXT") {
            throw new Error("Channel is not a text channel");
        }

        return [(channel as TextChannel), undefined];
    }
    catch(err) {
        const error = err as Error;
        return [undefined, error];
    }
};

export async function checkGuildMemberPermissions({ guildId, discordId, permission }: CheckGuildMemberPermissionsOptions): CheckPermissionsReturn {
    const guildPromise = bot.guilds.fetch(guildId);
    const [guild, guildFetchErr] = await promises.handle<Guild>(guildPromise);

    if(guildFetchErr) {
        return [undefined, guildFetchErr];
    }

    if(!guild) {
        return [undefined, new Error("No Guild Returned From Fetch")];
    }

    const guildMemberPromise = guild.members.fetch(discordId);
    const [guildMember, guildMemberFetchErr] = await promises.handle<GuildMember>(guildMemberPromise);

    if(guildMemberFetchErr) {
        return [undefined, guildMemberFetchErr];
    }

    if(!guildMember) {
        return [undefined, new Error("No Guild Member Returned From Fetch")];
    }

    const hasPermission = guildMember.permissions.has(permission);

    return [hasPermission, undefined];
};