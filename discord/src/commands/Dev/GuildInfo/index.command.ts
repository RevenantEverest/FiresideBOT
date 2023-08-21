import Discord, { Guild } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import { colors, dates } from '../../../utils/index.js';

async function GuildInfo({ bot, dispatch, args }: CommandParams) {
    const guildIdArg = dispatch.interaction?.options.getString("id") ?? args[0];
    const guild: Guild = guildIdArg ? await bot.guilds.fetch({ guild: guildIdArg }) : dispatch.guild; 
    const guildOwner = await guild.fetchOwner();

    const guildMembers = await guild.members.fetch();
    const memberCount = guildMembers.filter(member => !member.user.bot).size.toLocaleString();
    const botCount = guildMembers.filter(member => member.user.bot).size.toLocaleString();

    const joinedDate = dates.format(guild.joinedAt, { dateFormat: "MMMM Do, YYYY" });

    const embed = new Discord.MessageEmbed({
        color: colors.fuchsia,
        thumbnail: {
            url: guild.iconURL({ dynamic: true }) ?? ""
        },
        author: {
            name: `Guild Info For ${guild.name}`,
            iconURL: guild.iconURL({ dynamic: true }) ?? ""
        },
        fields: [
            { name: "Owner:", value: `${guildOwner.user.username} #${guildOwner.user.discriminator}` },
            { name: "Member Count:", value: memberCount, inline: true },
            { name: "Bot Count:", value: botCount, inline: true },
            { name: "Added Fireside On:", value: `${joinedDate.date}` },
        ],
        footer: {
            text: `ID: ${guild.id}`
        }
    });

    return dispatch.reply({ embeds: [embed] });
};

export const config: CommandConfig = {
    aliases: ["gi"],
    permissions: ["FIRESIDE_ADMIN"],
    description: "Displays an embed with info about a given guild or the provided guild ID",
    example: "guildinfo 145738299865749952"
};

export const slashCommand = new SlashCommandBuilder()
.setName("guildinfo")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("id")
    .setDescription("The ID of the guild you'd like info on")
);

export default GuildInfo;