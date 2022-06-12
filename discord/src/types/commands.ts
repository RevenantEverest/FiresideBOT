import { Client } from 'discord.js';
import { GuildSettings } from './entities/GuildSettings.js';
import { Server } from './server.js';
import { UserState } from './user.js';
import { GuildMessage } from './message.js';

export interface CommandOptions {

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

export interface CommandConfig {
    name: string,
    displayName: string,
    aliases: string[],
    flags?: string[],
    params?: CommandConfigParams,
    category: string,
    description: string,
    example: string,
};

export interface CommandFile extends CommandConfig {
    run: Function
};

export interface CommandFileImport {
    config: CommandConfig,
    default: Function
};

export interface CommandCategoryConfig {
    name: string,
    description: string
};

export interface CommandCategory extends CommandCategoryConfig {
    commands: CommandFile[]
};