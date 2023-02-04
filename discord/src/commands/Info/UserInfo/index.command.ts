import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import { colors, dates } from '../../../utils/index.js';
import { APIEmbedField } from 'discord-api-types/v10';

async function UserInfo({ dispatch }: CommandParams) {

    const user = dispatch.author;
    const guildMember = await dispatch.guild.members.fetch(user.id);

    const createdAt = dates.format(guildMember.user.createdAt, {
        dateFormat: "MMMM D, YYYY"
    });
    const joinedAt = dates.format(guildMember.joinedAt ?? "", {
        dateFormat: "MMMM D, YYYY"
    });

    const fields: APIEmbedField[] = [
        { name: "Member Since:", value: `${joinedAt.date}`, inline: true },
        { name: "Account Created:", value: `${createdAt.date}`, inline: true }
    ];

    if(guildMember.nickname) {
        fields.splice(0, 0, { name: "Nickname:", value: `${guildMember.nickname ?? "NA"}`, inline: true })
    }

    const embed = new Discord.MessageEmbed({
        color: colors.fuchsia,
        author: {
            name: `User Info for ${guildMember.user.username} #${guildMember.user.discriminator}`,
            iconURL: guildMember.displayAvatarURL({ dynamic: true }) ?? ""
        },
        thumbnail: {
            url: guildMember.displayAvatarURL({ dynamic: true }) ?? ""
        },
        fields,
        footer: {
            text: `User ID: ${guildMember.id}`
        }
    });

    return dispatch.reply({ embeds: [embed] });
};

export const config: CommandConfig = {
    aliases: ["ui"],
    permissions: [],
    description: "Displays information about command user or tagged user",
    example: "userinfo"
};

export const slashCommand = new SlashCommandBuilder()
.setName("userinfo")
.setDescription(config.description)

export default UserInfo;