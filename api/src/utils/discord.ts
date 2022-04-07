import { Client, AnyChannel, TextChannel } from 'discord.js';
import { TextChannelReturn } from '../types/discord.js';

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