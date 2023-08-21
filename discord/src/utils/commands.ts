import { GuildResolvable } from 'discord.js';
import config from '../config/index.js';

import { CommandDispatch, CommandFile, CommandOptions } from '../types/commands.js';
import { Server } from '../types/server.js';
import { GuildSettings } from '../types/entities/GuildSettings.js';

import { DEFAULTS } from '../constants/index.js';
import * as flags from './flags.js';

interface GetOptionsParams {
    guildId: GuildResolvable, 
    guildSettings: GuildSettings,
    commandResolvable: string,
};

interface GetOptionsReturn {
    server: Server,
    commandFile: CommandFile,
    options: CommandOptions
};

export async function getOptions({ guildId, guildSettings, commandResolvable }: GetOptionsParams): Promise<GetOptionsReturn> {
    const server = getServerObject(guildId, guildSettings);
    const commandFile = getFile(commandResolvable);
    const options: CommandOptions = {
        updatePending: config.updatePending
    };

    return { server, commandFile, options };
};

export function getServerObject(guildId: GuildResolvable, guildSettings: GuildSettings): Server {
    if(!config.servers.map(server => server.id).includes(guildId)) {
        DEFAULTS.generateDefaultServer(guildId, guildSettings);
    }

    return config.servers[config.servers.map(server => server.id).indexOf(guildId)];
};

export function getFile(commandResolvable: string): CommandFile {
    return config.commands.filter((command: CommandFile) => {
        if(command.name === commandResolvable || command.aliases && command.aliases.includes(commandResolvable)) {
            return command;
        }
    })[0];
};

export function hasPermissions(dispatch: CommandDispatch, args: string[], commandFile: CommandFile): boolean {
    for(let i = 0; i < commandFile.permissions.length; i++) {
        const current = commandFile.permissions[i];
        const hasPermission = current === "FIRESIDE_ADMIN" ? (dispatch.author.id === "163346982709100546" ? true : false) : dispatch.member.permissions.has(current);
        if(!hasPermission) {
            return false;
        }
    };

    if(!commandFile.flags || commandFile.flags?.length < 1) {
        return true;
    }

    const argFlags = flags.getCommandArgFlags(dispatch, args);
    const commandFlagsWithPermissions = commandFile.flags.filter((flag) => flag.permissions.length > 0);

    for(let i = 0; i < commandFlagsWithPermissions.length; i++) {
        const commandFlag = commandFlagsWithPermissions[i];

        for(let x = 0; x < commandFlag.permissions.length; x++) {
            const hasPermission = dispatch.member.permissions.has(commandFlag.permissions[x]);
            if(flags.containsFlag(commandFlag, argFlags) && !hasPermission) {
                return false;
            }
        }
    };

    return true;
};