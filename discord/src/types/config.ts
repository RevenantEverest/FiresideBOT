import { Server } from './server';
import { CommandFile, CommandCategory } from './commands';

export interface Config {
    userCount: number,
    guildCount: number,
    servers: Server[],
    version: string,
    updatePending: boolean,
    commands: CommandFile[],
    categories: CommandCategory[]
};