import Discord, { Client } from 'discord.js';
import { CommandFile, CommandDispatch } from '../../../../types/commands.js';

import { URLS } from '../../../../constants/index.js';
import { colors } from '../../../../utils/index.js';

function sendSingleCommand(PREFIX: string, bot: Client, dispatch: CommandDispatch,  command: CommandFile, flavorText: string) {

    const embed = new Discord.MessageEmbed({
        color: colors.fuchsia,
        author: {
            name: `Help Command - ${command.displayName}`,
            iconURL: bot.user?.avatarURL({ dynamic: true }) ?? ""
        },
        title: `${command.category} - ${command.displayName}`,
        description: `${command.description}\n\u200b`,
        fields: [
            { name: "Params", value: "Waiting to implement", inline: true },
            { name: "Aliases", value: command.aliases.map(alias => "`" + alias + "`").join(" "), inline: true },
            { name: "Example", value: `${PREFIX}${command.example}` },
            { name: "More Info", value: `[Click Here](${URLS.HELP_DOCUMENTATION}/commands/${command.name})` }
        ]
    });

    return dispatch.reply({ 
        content: flavorText,
        embeds: [embed] 
    });
};

export default sendSingleCommand;