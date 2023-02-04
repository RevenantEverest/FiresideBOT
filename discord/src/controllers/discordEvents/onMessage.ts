import { Client, GuildResolvable, Message, TextBasedChannel, ReplyMessageOptions, GuildMember } from 'discord.js';
import { CommandParams, CommandDispatch } from '../../types/commands.js';
import { GuildMessage } from '../../types/message.js';

import * as api from '../../api/index.js';

import { ERROR_MESSAGES } from '../../constants/index.js';
import { logs, colors, commands } from '../../utils/index.js';
import * as dispatchUtils from '../../utils/dispatch.js';

async function onMessage(bot: Client, message: Message) {

    if(!message.guild || message.author.bot) return;

    const dispatch: CommandDispatch = {
        guildId: message.guildId as GuildResolvable,
        author: message.author,
        member: message.member as GuildMember,
        guild: message.guild,
        message,
        channel: message.channel as TextBasedChannel,
        reply: async (content: ReplyMessageOptions) => {
            return dispatchUtils.sendReply(dispatch, content);
        }
    };

    const [guildSettings, err] = await api.guildSettings.getOrSave(dispatch);

    if(err) {
        return logs.error({ color: colors.error, type: "COMMAND-ERROR", err, message: "Error Getting Guild Settings" });
    }

    if(!guildSettings) {
        return logs.error({ color: colors.error, type: "COMMAND-ERROR", message: "No Guild Settings Returned" });
    }

    const PREFIX = guildSettings.prefix;

    if(!PREFIX || !message.content.startsWith(PREFIX)) 
        return;

    const args = message.content.substring(PREFIX.length).split(" ");
    
    const { server, commandFile, options } = await commands.getOptions({
        guildId: dispatch.guildId,
        commandResolvable: args[0].toLowerCase(),
        guildSettings
    });

    const disabledCommands = null;
    const userState = {
        premium: false
    };

    if(!commandFile) {
        return;
    }
    
    const params: CommandParams = {
        PREFIX, 
        bot, 
        dispatch, 
        message: message as GuildMessage,
        args: args.slice(1, args.length), 
        server, 
        options, 
        userState, 
        guildSettings,
        commandFile
    };

    const hasPermission = commands.hasPermissions(dispatch, args, commandFile);

    if(!hasPermission) {
        return dispatch.reply(ERROR_MESSAGES.MISSING_PERMISSIONS);
    }

    commandFile.run(params);
};

export default onMessage;