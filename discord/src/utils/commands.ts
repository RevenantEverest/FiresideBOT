import { GuildResolvable } from 'discord.js';
import config from '../config/index.js';

import { CommandFile, CommandOptions } from '../types/commands.js';
import { Server } from '../types/server.js';
import { GuildSettings } from '../types/entities/GuildSettings.js';
import { HandleReturn } from '../types/promises.js';

import { DEFAULTS } from '../constants/index.js';

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