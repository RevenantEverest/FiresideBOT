import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import * as api from '../../../api/index.js';
import { IMAGE_RESOURCES } from '../../../constants/index.js';
import { colors } from '../../../utils/index.js';

async function Balance({ dispatch, guildSettings }: CommandParams) {
    const [record, err] = await api.guildCurrencyRecords.getByGuildIdAndDiscordId(dispatch, dispatch.author.id);

    if(err || !record) {
        return;
    }

    const embed = new Discord.MessageEmbed({
        color: colors.fireside,
        author: {
            iconURL: dispatch.author.avatarURL({ dynamic: true }) ?? "",
            name: `Bank Records For ${dispatch.author.username} #${dispatch.author.discriminator}`
        },
        description: `**${guildSettings.currency_name}:** ${record.balance.toLocaleString()}`,
        thumbnail: {
            url: IMAGE_RESOURCES.BANK_ICON
        },
        footer: {
            iconURL: dispatch.guild.iconURL({ dynamic: true }) ?? "",
            text: dispatch.guild.name
        }
    });

    return dispatch.reply({ embeds: [embed] });
};

export const config: CommandConfig = {
    aliases: ["bal"],
    permissions: [],
    description: "Displays your current server currency balance",
    example: "balance"
};

export const slashCommand = new SlashCommandBuilder()
.setName('balance')
.setDescription(config.description)

export default Balance;