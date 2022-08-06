import Discord, { Client, Message, PartialMessage } from 'discord.js';
import { GuildMessage } from '../types/message.js';
import { CommandDispatch } from '../types/commands.js';
import { CommandConfig } from '../types/commands.js';

import { ERROR_MESSAGES } from '../constants/index.js';
import * as colors from './colors.js';

interface HandlerOptions {
    bot: Client,
    dispatch: CommandDispatch,
    err?: Error,
    errMessage: string,
    commandName: string
};

export async function command({ bot, dispatch, err, errMessage, commandName }: HandlerOptions) {
    const embed = new Discord.MessageEmbed({
        color: colors.error,
        fields: [{ 
            name: errMessage, 
            value: ERROR_MESSAGES.OPEN_TICKET 
        }]
    });

    logError(bot, );

    const returnMessage: Message = await dispatch.channel.send({ embeds: [embed] });
    
    if(!returnMessage) return;

    await returnMessage.react("✅");
    await returnMessage.react("❌");
};

export function internal() {

};

export function logError({  }) {

};