import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import botConfig from '../../../config/index.js';

import { URLS } from '../../../constants/index.js';
import { colors, dates } from '../../../utils/index.js';

async function BotInfo({ bot, dispatch }: CommandParams) {

    const creator = await bot.users.fetch("163346982709100546");

    const createdAt = dates.format(bot.user?.createdAt ?? "", {
        dateFormat: "MMMM D, YYYY"
    });

    const embed = new Discord.MessageEmbed({
        color: colors.fuchsia,
        author: {
            name: bot.user?.username,
            iconURL: bot.user?.avatarURL({ dynamic: true }) ?? ""
        },
        thumbnail: {
            url: bot.user?.avatarURL({ dynamic: true }) ?? ""
        },
        fields: [
            { name: "Users:", value: `${botConfig.userCount}`, inline: true },
            { name: "Guilds:", value: `${botConfig.guildCount}`, inline: true },
            { name: "Commands:", value: `${botConfig.commands.length}`, inline: true },
            { name: "Version:", value: `v${botConfig.version}`, inline: true },
            { name: "Created At:", value: `${createdAt.date}`, inline: true },
            { 
                name: "Resources", 
                value: `[Website](https://firesidebot.com) | [Support Server](${URLS.SUPPORT_SERVER}) | [Help Docs](https://help.firesidebot.com)`
            },
        ],
        footer: {
            text: `Created By: ${creator.username} #${creator.discriminator}`,
            iconURL: creator.avatarURL({ dynamic: true }) ?? ""
        }
    });

    return dispatch.reply({ embeds: [embed] });
};

export const config: CommandConfigParams = {
    aliases: ["bi"],
    description: "Displays information about Fireside",
    example: "botinfo"
};

export const slashCommand = new SlashCommandBuilder()
.setName("botinfo")
.setDescription(config.description)

export default BotInfo;