import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';
import { GuildPlaylist } from '../../../types/entities/GuildPlaylist.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES, FLAGS } from '../../../constants/index.js';
import { flags, errors } from '../../../utils/index.js';
import { UserPlaylist } from 'src/types/entities/UserPlaylist.js';

async function DeletePlaylist({ dispatch, args, commandFile }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.DELETE_PLAYLIST.NO_ARGS);
    }

    const argFlags = flags.getCommandArgFlags(dispatch, args);
    const playlistName = dispatch.interaction?.options.getString("name") ?? flags.removeFromArgs(args).join(" ");

    if(!playlistName) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.DELETE_PLAYLIST.NO_ARGS);
    }

    if(flags.containsFlag(FLAGS.SERVER_PLAYLIST, argFlags)) {

        const [guildPlaylist, getErr] = await api.guildPlaylists.getByGuildIdAndName(dispatch, dispatch.guildId, playlistName);

        if(getErr || !guildPlaylist) {
            return errors.commandApi<GuildPlaylist>({ 
                dispatch, 
                err: getErr, 
                commandFile, 
                resource: guildPlaylist,
                missingResourceMessage: "No server playlist found"  
            });
        }

        const [deletedPlaylist, err] = await api.guildPlaylists.destroy(dispatch, guildPlaylist);

        if(err || !deletedPlaylist) {
            return errors.commandApi<GuildPlaylist>({
                dispatch,
                err,
                commandFile,
                resource: deletedPlaylist,
                missingResourceMessage: "No server playlist returned"
            });
        }

        return dispatch.reply(`Server playlist **${deletedPlaylist.name}** has been deleted`);
    }

    const [userPlaylist, getErr] = await api.userPlaylists.getByDiscordIdAndName(dispatch, dispatch.author.id, playlistName);

    if(getErr || !userPlaylist) {
        return errors.commandApi<UserPlaylist>({
            dispatch,
            err: getErr,
            commandFile,
            resource: userPlaylist,
            missingResourceMessage: "No playlist found"
        });
    }

    const [deletedPlaylist, err] = await api.userPlaylists.destroy(dispatch, userPlaylist);

    if(err || !deletedPlaylist) {
        return errors.commandApi<UserPlaylist>({
            dispatch,
            err,
            commandFile,
            resource: deletedPlaylist,
            missingResourceMessage: "No playlist returned"
        });
    }

    return dispatch.reply(`Playlist **${deletedPlaylist.name}** has been deleted`);
};

export const config: CommandConfig = {
    aliases: ["dp"],
    permissions: [],
    flags: [FLAGS.SERVER_PLAYLIST],
    description: "Deleted a playlist",
    example: "deleteplaylist MyPlaylist"
};

export const slashCommand = new SlashCommandBuilder()
.setName("deleteplaylist")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("name")
    .setDescription("The name of your new playlist")
    .setRequired(true)
)
.addStringOption(option => 
    option
    .setName("flags")
    .setDescription("Choose which flag to add to the command")
    .addChoices({ name: FLAGS.SERVER_PLAYLIST.name, value: FLAGS.SERVER_PLAYLIST.usageSymbol[0] })
);

export default DeletePlaylist;