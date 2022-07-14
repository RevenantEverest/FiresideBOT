import Discord, { Client, Message, PartialMessage } from 'discord.js';
import { GuildMessage } from '../types/message.js';
import { CommandConfig } from '../types/commands.js';

import { ERROR_MESSAGES } from '../constants/index.js';
import * as colors from './colors.js';

interface HandlerOptions {
    bot: Client,
    message: GuildMessage,
    err?: Error,
    errMessage: string,
    commandName: string
};

export async function handler({ bot, message, err, errMessage, commandName }: HandlerOptions) {
    const embed = new Discord.MessageEmbed({
        color: colors.error,
        fields: [{ 
            name: errMessage, 
            value: ERROR_MESSAGES.OPEN_TICKET 
        }]
    });

    logError(bot, );

    const returnMessage: Message = await message.channel.send({ embeds: [embed] });
    
    if(!returnMessage) return;

    await returnMessage.react("✅");
    await returnMessage.react("❌");
};

export function internalHandler() {

};

export function logError({  }) {

};