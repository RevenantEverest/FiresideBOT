import { Client, GuildMember, Interaction, InteractionReplyOptions, TextBasedChannel } from 'discord.js';

import { CommandOptions, CommandFile, CommandParams, CommandDispatch } from '../../types/commands.js';
import { GuildInteraction } from 'src/types/interaction.js';

import config from '../../config/index.js';
import * as api from '../../api/index.js';

import { DEFAULTS } from '../../constants/index.js';
import { colors, logs, promises } from '../../utils/index.js';

async function onInteractionCreate(bot: Client, interaction: Interaction) {
    if(!interaction.isCommand() || !interaction.inGuild()) return;

    const [guild, guildErr] = await promises.handle(bot.guilds.fetch(interaction.guildId));

    if(guildErr) {
        return logs.error({ color: colors.error, type: "INTERACTION-ERROR", err: guildErr, message: "Error Getting Guild" });
    }

    if(!guild) {
        return logs.error({ color: colors.error, type: "INTERACTION-ERROR", message: "No Guild Returned" });
    }

    const [channel, channelErr] = await promises.handle(bot.channels.fetch(interaction.channelId));

    if(channelErr) {
        return logs.error({ color: colors.error, type: "INTERACTION-ERROR", err: guildErr, message: "Error Getting Channel" });
    }

    if(!channel) {
        return logs.error({ color: colors.error, type: "INTERACTION-ERROR", message: "No Channel Returned" });
    }

    const [guildMember, guildMemberErr] = await promises.handle(guild.members.fetch(interaction.user.id));

    if(guildMemberErr) {
        return logs.error({ color: colors.error, type: "INTERACTION-ERROR", err: guildErr, message: "Error Getting Guild Member" });
    }

    if(!guildMember) {
        return logs.error({ color: colors.error, type: "INTERACTION-ERROR", message: "No Guild Member Returned" });
    }

    const guildInteraction: CommandDispatch = {
        guildId: interaction.guildId,
        author: interaction.user,
        guild: guild,
        member: guildMember,
        channel: channel as TextBasedChannel,
        reply: async (options: InteractionReplyOptions) => interaction.reply(options)
    };

    const [guildSettings, err] = await api.guildSettings.get(interaction.guildId, guildInteraction);

    if(err) {
        return logs.error({ color: colors.error, type: "INTERACTION-ERROR", err, message: "Error Getting Guild Settings" });
    }

    if(!guildSettings) {
        return logs.error({ color: colors.error, type: "INTERACTION-ERROR", message: "No Guild Settings Returned" });
    }

    const PREFIX = guildSettings.prefix;

    if(!config.servers.map(server => server.id).includes(interaction.guildId)) {
        DEFAULTS.generateDefaultServer(interaction.guildId, guildSettings);
    }

    const server = config.servers[config.servers.map(server => server.id).indexOf(interaction.guildId)];
    const options: CommandOptions = {
        updatePending: config.updatePending
    };
    const disabledCommands = null;
    const userState = {
        premium: false
    };

    const commandFile = config.commands.filter((command: CommandFile) => command.name === interaction.commandName)[0];

    if(!commandFile) {
        return;
    }
    
    const params: CommandParams = {
        PREFIX, 
        bot, 
        args: [],
        dispatch: guildInteraction,
        interaction: interaction as GuildInteraction,
        server, 
        options, 
        userState, 
        guildSettings
    };
    commandFile.run(params);
};

export default onInteractionCreate;