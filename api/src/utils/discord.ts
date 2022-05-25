import { 
    AnyChannel, 
    TextChannel, 
    Guild, 
    GuildMember,
    Role,
    GuildResolvable
} from 'discord.js';
import BigNumber from 'bignumber.js';

import bot from '../discordBot.js';

import * as promises from './promises.js';
import { NUMBERS } from '../constants/index.js';

import { 
    TextChannelReturn, 
    CheckGuildMemberPermissionsOptions, 
    GuildMemberOptions,
    HasRoleOptions
} from '../types/discord';
import { HandleReturn } from '../types/promises.js';

type CheckPermissionsReturn = Promise<HandleReturn<boolean>>;

export function isValidId(idString: string): boolean {
    const id = new BigNumber(idString);

    if(!id.isNaN() && !id.isGreaterThan(NUMBERS.MAX_BIGINT)) {
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

export async function getGuild(guildId: GuildResolvable): Promise<HandleReturn<Guild>> {
    const guildPromise = bot.guilds.fetch({
        guild: guildId
    });

    const [guild, err] = await promises.handle(guildPromise);

    if(err) {
        if(err.message === "Missing Access") {
            return [undefined, new Error("Guild not reachable by Fireside")];
        }
        return [undefined, err];
    }

    return [guild, undefined];
};

export async function getGuildMember({ guildId, discordId }: GuildMemberOptions): Promise<HandleReturn<GuildMember>> {
    const [guild, guildErr] = await getGuild(guildId);

    if(guildErr) {
        return [undefined, guildErr];
    }

    if(!guild) {
        return [undefined, new Error("No Guild Returned From Fetch")];
    }

    const guildMemberPromise = guild.members.fetch(discordId);
    const [guildMember, err] = await promises.handle(guildMemberPromise);

    if(err) {
        return [undefined, err];
    }

    return [guildMember, undefined];
};

export async function isGuildMember({ guildId, discordId }: GuildMemberOptions): Promise<HandleReturn<boolean>> {

    const [guildMember, err] = await getGuildMember({ guildId, discordId });

    if(err) {
        if(err.message === "Unknown Member") {
            return [false, undefined];
        }
        
        return [undefined, err];
    }

    if(!guildMember) {
        return [false, undefined];
    }

    return [true, undefined];
};

export async function hasRole({ guildId, discordId, roles }: HasRoleOptions): Promise<HandleReturn<boolean>> {
    const [guildMember, err] = await getGuildMember({ guildId, discordId });

    if(err) {
        if(err.message === "Unknown Member") {
            return [false, undefined];
        }
        
        return [undefined, err];
    }

    if(!guildMember) {
        return [false, undefined];
    }

    const memberRoles = guildMember.roles.cache.map((memberRole: Role) => memberRole.id);
    const hasRole = memberRoles.filter((memberRole: string) => roles.includes(memberRole)).length > 0;

    return [hasRole, undefined];
};