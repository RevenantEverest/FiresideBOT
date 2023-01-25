import Discord, { Client, Message } from 'discord.js';
import { CommandDispatch } from '../types/commands.js';
import bot from '../discordBot.js';

import { ERROR_MESSAGES, EMOJIS } from '../constants/index.js';
import * as logs from './logs.js';
import * as colors from './colors.js';

interface CommandErrorOptions {
    dispatch: CommandDispatch,
    err?: Error,
    errMessage: string,
    commandName: string
};

interface UtilityErrorOptions {
    dispatch: CommandDispatch,
    err?: Error,
    errMessage: string,
    resourceName: string
};

interface InternalErrorOptions {
    err?: Error,
    errMessage: string,
    resourceName: string
};

interface LogErrorOptions {
    err: Error,
    errMessage: string,
    resourceName: string,
};

interface SendErrorEmbedOptions {
    dispatch: CommandDispatch, 
    errMessage: string, 
    resourceName: string, 
    isCommand?: boolean, 
    isUtility?: boolean
};

export function command({ dispatch, err, errMessage, commandName }: CommandErrorOptions) {
    sendErrorEmbed({ dispatch, errMessage, resourceName: commandName, isCommand: true });

    if(err) {
        logError({ err, errMessage, resourceName: commandName });
    }
};

export function utility({ dispatch, err, errMessage, resourceName }: UtilityErrorOptions) {
    sendErrorEmbed({ dispatch, errMessage, resourceName, isUtility: true });

    if(err) {
        logError({ err, errMessage, resourceName });
    }
};

export async function sendErrorEmbed({ dispatch, errMessage, resourceName, ...options }: SendErrorEmbedOptions) {
    const embed = new Discord.MessageEmbed({
        color: colors.error,
        title: generateEmbedTitle(),
        fields: [{ 
            name: errMessage, 
            value: ERROR_MESSAGES.OPEN_TICKET 
        }]
    });

    const returnMessage: Message = await dispatch.channel.send({ embeds: [embed] });

    if(!returnMessage) return;

    await returnMessage.react(EMOJIS.CHECK_MARK);
    await returnMessage.react(EMOJIS.X_MARK);

    function generateEmbedTitle() {
        if(options.isCommand) {
            return `[COMMAND] - ${resourceName}`;
        }
        
        if(options.isUtility) {
            return `[UTILITY] - ${resourceName}`;
        }

        return resourceName;
    };
};

export function internal({ err, errMessage, resourceName }: InternalErrorOptions) {
    if(err) {
        logError({ err, errMessage, resourceName });
    }
};

export function logError({ err, errMessage, resourceName }: LogErrorOptions) {
    logs.error({ color: colors.error, err, type: `ERROR - ${resourceName}`, message: errMessage });
};