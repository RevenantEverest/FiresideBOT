import { Client, Message } from 'discord.js';
import { Server } from './server';
import { UserState } from './user';

export interface CommandOptions {

};

export interface CommandParams {
    PREFIX: string,
    bot: Client,
    message: Message,
    args: string[],
    server: Server,
    options: CommandOptions,
    userState: UserState
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

export interface CommandCategory {
    name: string,
    description: string,
    commands: CommandFile[]
};