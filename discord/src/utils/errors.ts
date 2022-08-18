import Discord, { Client, Message } from 'discord.js';
import { CommandDispatch } from '../types/commands.js';

import { ERROR_MESSAGES } from '../constants/index.js';
import * as logs from './logs.js';
import * as colors from './colors.js';

interface CommandErrorOptions {
    bot: Client,
    dispatch: CommandDispatch,
    err?: Error,
    errMessage: string,
    commandName: string
};

interface InternalErrorOptions {
    err?: Error,
    errMessage: string,
    resourceName: string
};

interface LogErrorOptions {
    bot?: Client<boolean>,
    err: Error,
    errMessage: string,
    resourceName: string,
};

export async function command({ bot, dispatch, err, errMessage, commandName }: CommandErrorOptions) {
    const embed = new Discord.MessageEmbed({
        color: colors.error,
        fields: [{ 
            name: errMessage, 
            value: ERROR_MESSAGES.OPEN_TICKET 
        }]
    });

    const returnMessage: Message = await dispatch.channel.send({ embeds: [embed] });
    
    if(!returnMessage) return;

    await returnMessage.react("✅");
    await returnMessage.react("❌");

    if(err) {
        logError({ bot, err, errMessage, resourceName: commandName });
    }
};

export function internal({ err, errMessage, resourceName }: InternalErrorOptions) {
    if(err) {
        logError({ err, errMessage, resourceName });
    }
};

export function logError({ bot, err, errMessage, resourceName }: LogErrorOptions) {
    logs.error({ color: colors.error, type: `ERROR - ${resourceName}`, message: errMessage });
};