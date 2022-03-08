import Discord, { TextChannel } from 'discord.js';
import chalk from 'chalk';
import { LOG_CHANNELS } from '../constants/index.js';
import * as dates from './dates.js';
import { logTypes } from '../types/index.js';

export async function log({ color, type="LOG", message="" }: logTypes.LogOptions) {
    const logType = "[" + type + "]";
    return console.log(chalk.hex(color.toString())(logType) + " " + message);
};

export async function error({ color, type="ERROR", message="", err }: logTypes.ErrorLogOptions) {
    const logType = "[" + type + "]";
    return console.error(chalk.hex(color.toString())(logType) + " " + message, err);
};

export async function postToLogsChannel({ bot, color, title }: logTypes.PostToLogsChannelOptions) {
    const { date, time } = await dates.getTimestampAndFormat();
    const logChannel = await bot.channels.fetch(LOG_CHANNELS.LOGS) as TextChannel;

    const embed = new Discord.MessageEmbed({ 
        color: color, 
        title: title, 
        footer: { text: `${date} at ${time}` } 
    });

    return logChannel.send({ embeds: [embed] });
};