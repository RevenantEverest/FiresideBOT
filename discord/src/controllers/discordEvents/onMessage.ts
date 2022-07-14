import { Client, Message } from 'discord.js';
import { CommandFile, CommandParams } from '../../types/commands.js';
import { GuildMessage } from '../../types/message.js';

import config from '../../config/index.js';

import { guildSettingServices } from '../../api/index.js';

import { DEFAULTS } from '../../constants/index.js';
import { logs, colors } from '../../utils/index.js';

async function onMessage(bot: Client, message: Message) {

    if(!message.guild || message.author.bot) return;

    const [guildSettings, err] = await guildSettingServices.getGuildSettings(message.guild.id, message);

    if(err) {
        return logs.error({ color: colors.error, type: "COMMAND-ERROR", err, message: "Error Getting Guild Settings" });
    }

    if(!guildSettings) {
        return logs.error({ color: colors.error, type: "COMMAND-ERROR", message: "No Guild Settings Returned" });
    }

    const PREFIX = guildSettings.prefix;

    if(!PREFIX || !message.content.startsWith(PREFIX)) 
        return;

    if(!config.servers.map(server => server.id).includes(message.guild.id)) {
        DEFAULTS.generateDefaultServer(message.guild.id);
    }

    const args = message.content.substring(PREFIX.length).split(" ");
    const server = config.servers[config.servers.map(server => server.id).indexOf(message.guild?.id)];
    const options = config.updatePending;
    const disabledCommands = null;
    const userState = {};

    const commandFile = config.commands.filter((command: CommandFile) => {
        if(command.name === args[0].toLowerCase() || command.aliases && command.aliases.includes(args[0].toLowerCase()))
            return command;
    })[0];

    if(!commandFile) {
        return;
    }
    
    const params: CommandParams = {
        PREFIX, 
        bot, 
        message: message as GuildMessage, 
        args, 
        server, 
        options, 
        userState, 
        guildSettings
    };
    commandFile.run(params);
};

export default onMessage;