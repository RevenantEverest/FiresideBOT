import { Client, AnyChannel, TextChannel } from 'discord.js';
import { discordTypes } from '../types/index.js';

type TextChannelReturn = discordTypes.TextChannelReturn;

export async function getTextChannel(bot: Client, channelId: string): TextChannelReturn {
    try {
        const channel = await bot.channels.fetch(channelId) as AnyChannel;

        if(channel.type !== "GUILD_TEXT") {
            throw new Error("Channel is not a text channel");
        }

        return [(channel as TextChannel), undefined];
    }
    catch(err) {
        const error = err as Error;
        return [undefined, error];
    }
};