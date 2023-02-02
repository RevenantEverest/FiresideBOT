import { 
    Client, 
    Guild, 
    GuildMember, 
    User, 
    TextBasedChannel, 
    GuildResolvable, 
    Message,
    PermissionString
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import { GuildSettings } from './entities/GuildSettings.js';
import { Server } from './server.js';
import { UserState } from './user.js';
import { GuildMessage } from './message.js';
import { GuildInteraction } from './interaction.js';
import { Flag } from './flags.js';

export interface CommandDispatch {
    guildId: GuildResolvable,
    guild: Guild,
    member: GuildMember,
    author: User,
    channel: TextBasedChannel,
    interaction?: GuildInteraction,
    message?: Message,
    reply: Function
};

export interface CommandOptions {
    updatePending: boolean
};

export interface CommandParams {
    PREFIX: string,
    bot: Client,
    dispatch: CommandDispatch,
    message?: GuildMessage,
    args: string[],
    server: Server,
    options: CommandOptions,
    userState: UserState,
    guildSettings: GuildSettings,
    commandFile: CommandFile
};

export interface CommandConfigParams {
    name: string,
    description: string,
    isRequired: boolean
};

export interface CommandConfig {
    aliases: string[],
    flags?: Flag[],
    params?: CommandConfigParams[],
    permissions: PermissionString[],
    description: string,
    example: string,
};

export interface Command extends CommandConfig {
    name: string,
    displayName: string,
    category: string
};

export interface CommandFile extends Command {
    slashCommand?: SlashCommandBuilder,
    run: Function
};

export interface CommandFileImport {
    config: CommandConfig,
    slashCommand?: SlashCommandBuilder,
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