import { 
    AnyChannel, 
    TextChannel, 
    Guild, 
    GuildMember
} from 'discord.js';
import bot from '../discordBot.js';

import * as promises from './promises.js';

import { TextChannelReturn, CheckGuildMemberPermissionsOptions } from '../types/discord';
import { HandleReturn } from '../types/promises.js';

type CheckPermissionsReturn = Promise<HandleReturn<boolean>>;

export function isValidId(idString: string): boolean {
    if(!idString || typeof idString !== "string" || idString.length > 20 || idString.length < 18) {
        return true;
    }
    
    return false;
};

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

export async function checkMemberPermissions({ guildId, discordId, permission }: CheckGuildMemberPermissionsOptions): CheckPermissionsReturn {
    const guildPromise = bot.guilds.fetch({
        guild: guildId
    });
    const [guild, guildFetchErr] = await promises.handle<Guild>(guildPromise);

    if(guildFetchErr) {
        if(guildFetchErr.message === "Missing Access") {
            return [undefined, new Error("Guild not reachable by Fireside")];
        }
        else {
            console.log("Erroring Here");
            return [undefined, guildFetchErr];
        }
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