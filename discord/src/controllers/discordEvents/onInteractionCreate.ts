import { Client, Interaction, InteractionReplyOptions, TextBasedChannel } from 'discord.js';

import { CommandParams, CommandDispatch } from '../../types/commands.js';

import * as api from '../../api/index.js';

import { ERROR_MESSAGES } from '../../constants/index.js';
import { colors, logs, promises, commands } from '../../utils/index.js';
import * as dispatchUtils from '../../utils/dispatch.js';

async function onInteractionCreate(bot: Client, interaction: Interaction) {
    if(!interaction.isCommand() || !interaction.inGuild()) return;

    /* Defer reply on event fire to prevent 3s timeout fatal error */
    await interaction.deferReply();

    const [guild, guildErr] = await promises.handle(bot.guilds.fetch(interaction.guildId));

    if(guildErr) {
        return logs.error({ 
            color: colors.error, 
            type: "INTERACTION-ERROR", 
            err: guildErr, 
            message: "Error Getting Guild" 
        });
    }

    if(!guild) {
        return logs.error({ 
            color: colors.error, 
            type: "INTERACTION-ERROR", 
            message: "No Guild Returned" 
        });
    }

    const [channel, channelErr] = await promises.handle(bot.channels.fetch(interaction.channelId));

    if(channelErr) {
        return logs.error({ 
            color: colors.error, 
            type: "INTERACTION-ERROR", 
            err: guildErr, 
            message: "Error Getting Channel" 
        });
    }

    if(!channel) {
        return logs.error({ 
            color: colors.error, 
            type: "INTERACTION-ERROR", 
            message: "No Channel Returned" 
        });
    }

    const [guildMember, guildMemberErr] = await promises.handle(guild.members.fetch(interaction.user.id));

    if(guildMemberErr) {
        return logs.error({ 
            color: colors.error, 
            type: "INTERACTION-ERROR", 
            err: guildErr, 
            message: "Error Getting Guild Member" 
        });
    }

    if(!guildMember) {
        return logs.error({ 
            color: colors.error, 
            type: "INTERACTION-ERROR", 
            message: "No Guild Member Returned" 
        });
    }

    const { guildId, user } = interaction;
    const dispatch: CommandDispatch = {
        guildId,
        author: user,
        guild: guild,
        member: guildMember,
        interaction,
        channel: channel as TextBasedChannel,
        reply: async (content: InteractionReplyOptions) => {
            return dispatchUtils.sendReply(dispatch, content);
        }
    };

    const [guildSettings, err] = await api.guildSettings.getOrSave(dispatch);

    if(err) {
        return logs.error({ 
            color: colors.error, 
            type: "INTERACTION-ERROR", 
            err, 
            message: "Error Getting Guild Settings" 
        });
    }

    if(!guildSettings) {
        return logs.error({ 
            color: colors.error, 
            type: "INTERACTION-ERROR", 
            message: "No Guild Settings Returned" 
        });
    }

    const PREFIX = guildSettings.prefix;

    const { server, options, commandFile } = await commands.getOptions({ 
        guildId: guildId,
        commandResolvable: interaction.commandName, 
        guildSettings 
    });

    const disabledCommands = null;
    const userState = {
        premium: true
    };

    if(!commandFile) {
        return;
    }

    for(let i = 0; i < commandFile.permissions.length; i++) {
        const hasPermission = dispatch.member.permissions.has(commandFile.permissions[i]);
        if(!hasPermission) {
            return dispatch.reply(ERROR_MESSAGES.MISSING_PERMISSIONS);
        }
    };
    
    const params: CommandParams = {
        PREFIX, 
        bot, 
        args: [],
        dispatch,
        server, 
        options, 
        userState, 
        guildSettings,
        commandFile
    };
    commandFile.run(params);
};

export default onInteractionCreate;