import type { CommandParams, CommandConfig } from '@@types/commands.js';

import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { APIEmbedField } from 'discord-api-types/v10';

import { colors, dates, regex } from '@@utils/index.js';

async function UserInfo({ dispatch, args }: CommandParams) {

    const interaction = dispatch.interaction;

    let userMention = interaction?.options.getUser("user");
    let userId = userMention?.id ?? dispatch.author.id;

    if(!userMention && regex.hasUserTag(args.join(" "))) {
        const userMentionParse = regex.parseUserTag(args.join(" "));

        if(userMentionParse) {
            args = args.join(" ").replace(regex.userRegex, "").split(" ").filter(el => el !== "");
            userId = userMentionParse;
        }
    }

    const guildMember = await dispatch.guild.members.fetch(userId);

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
            name: `User Info for ${guildMember.user.username}`,
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
.addUserOption(option => 
    option
    .setName("user")
    .setDescription("The user you'd like to see info for")
)

export default UserInfo;