import { Client } from 'discord.js';

export type LogColor = number | string;
export type EmbedColor = number;

export interface LogOptions {
    color: LogColor,
    type?: string,
    message?: string
};

export interface ErrorLogOptions {
    color: LogColor,
    type?: string,
    message?: string,
    err?: Error 
};

export interface PostToLogsChannelOptions {
    bot: Client,
    color: EmbedColor,
    title: string
};