import { Client, GuildResolvable, Message, TextBasedChannel, ReplyMessageOptions, GuildMember } from 'discord.js';
import { CommandFile, CommandOptions, CommandParams, CommandDispatch } from '../../types/commands.js';
import { GuildMessage } from '../../types/message.js';

import config from '../../config/index.js';

import * as api from '../../api/index.js';

import { DEFAULTS } from '../../constants/index.js';
import { logs, colors } from '../../utils/index.js';

async function onMessage(bot: Client, message: Message) {

    if(!message.guild || message.author.bot) return;

    const guildMessage: CommandDispatch = {
        guildId: message.guildId as GuildResolvable,
        author: message.author,
        member: message.member as GuildMember,
        guild: message.guild,
        channel: message.channel as TextBasedChannel,
        reply: async (options: ReplyMessageOptions) => message.reply(options)
    };

    const [guildSettings, err] = await api.guildSettings.get(message.guild.id, guildMessage);

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
        DEFAULTS.generateDefaultServer(message.guild.id, guildSettings);
    }

    const args = message.content.substring(PREFIX.length).split(" ");
    const server = config.servers[config.servers.map(server => server.id).indexOf(message.guild?.id)];
    const options: CommandOptions = {
        updatePending: config.updatePending
    };
    const disabledCommands = null;
    const userState = {
        premium: false
    };

    const commandFile = config.commands.filter((command: CommandFile) => {
        if(command.name === args[0].toLowerCase() || command.aliases && command.aliases.includes(args[0].toLowerCase())) {
            return command;
        }
    })[0];

    if(!commandFile) {
        return;
    }

    args.splice(0, 1); // Remove Command Name From Args
    
    const params: CommandParams = {
        PREFIX, 
        bot, 
        dispatch: guildMessage, 
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