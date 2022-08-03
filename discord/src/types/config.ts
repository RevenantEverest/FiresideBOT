import { Server } from './server';
import { CommandFile, CommandCategory } from './commands';

export interface Config {
    servers: Server[],
    version: string,
    updatePending: boolean,
    commands: CommandFile[],
    categories: CommandCategory[]
};