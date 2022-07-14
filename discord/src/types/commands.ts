import { Client } from 'discord.js';
import { GuildSettings } from './entities/GuildSettings.js';
import { Server } from './server.js';
import { UserState } from './user.js';
import { GuildMessage } from './message.js';

export interface CommandOptions {
    updatePending: boolean
};

export interface CommandParams {
    PREFIX: string,
    bot: Client,
    message: GuildMessage,
    args: string[],
    server: Server,
    options: CommandOptions,
    userState: UserState,
    guildSettings: GuildSettings
};

export interface CommandConfigParams {

};

export interface CommandConfigParams {
    aliases: string[],
    flags?: string[],
    params?: CommandConfigParams,
    description: string,
    example: string,
}

export interface CommandConfig extends CommandConfigParams {
    name: string,
    displayName: string,
    category: string,
};

export interface CommandFile extends CommandConfig {
    run: Function
};

export interface CommandFileImport {
    config: CommandConfig,
    default: Function
};

export interface CommandCategoryFileConfig {
    description: string
};

export interface CommandCategoryConfig extends CommandCategoryFileConfig {
    name: string
};

export interface CommandCategory extends CommandCategoryConfig {
    commands: CommandFile[]
};