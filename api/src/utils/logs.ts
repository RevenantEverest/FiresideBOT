import Discord, { Client, TextChannel } from 'discord.js';
import chalk from 'chalk';
import { LOG_CHANNELS } from '../constants/index.js';
import * as dates from './dates.js';

type LogColor = number | string;
type EmbedColor = number;

interface LogOptions {
    color: LogColor,
    type?: string,
    message: string
};

interface PostToLogsChannelOptions {
    bot: Client,
    color: EmbedColor,
    title: string
};

export async function log({ color, type="LOG", message }: LogOptions) {
    const logType = "[" + type + "]";
    return console.log(chalk.hex(color.toString())(logType) + " " + message);
};

export async function postToLogsChannel({ bot, color, title }: PostToLogsChannelOptions) {
    const { date, time } = await dates.getTimestampAndFormat();
    const logChannel = await bot.channels.fetch(LOG_CHANNELS.LOGS) as TextChannel;

    const embed = new Discord.MessageEmbed({ 
        color: color, 
        title: title, 
        footer: { text: `${date} at ${time}` } 
    });

    return logChannel.send({ embeds: [embed] });
};