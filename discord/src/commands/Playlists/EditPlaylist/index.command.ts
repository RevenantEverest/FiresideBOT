import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { UserPlaylistUpdate } from '../../../types/entities/UserPlaylist.js';

import * as api from '../../../api/index.js';
import { ERROR_MESSAGES, EMOJIS } from '../../../constants/index.js';
import { regex, errors } from '../../../utils/index.js';

async function EditPlaylist({ bot, args, dispatch }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.EDIT_PLAYLIST.NO_ARGS);
    }

    const playlistName = dispatch.interaction?.options.getString("name") ?? args[0];
    const [userPlaylist, getErr] = await api.userPlaylists.getByDiscordIdAndName(dispatch, dispatch.author.id, playlistName);

    if(getErr) {
        if(getErr.response && getErr.response.status !== 500) {
            const responseData = getErr.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ bot, dispatch, err: getErr, errMessage: getErr.message, commandName: "" });
    }

    if(!userPlaylist) {
        return dispatch.reply("No Playlist found");
    }

    const playlistToUpdate: UserPlaylistUpdate = { 
        id: userPlaylist.id, 
        discord_id: userPlaylist.discord_id
    };
    const flags = dispatch.interaction?.options.getString("flags") ?? regex.parseCommandFlags(args.join(" "));

    if(flags && flags.includes("p")) {
        playlistToUpdate.is_public = !userPlaylist.is_public;
    }

    /* Removes PlaylistName and flags from arguments */
    const updatedPlaylistName = args.join(" ").replace(playlistName, "").replace(regex.commandFlagReplaceRegex, "").split(" ")[1];

    if(updatedPlaylistName) {
        playlistToUpdate.name = updatedPlaylistName;
    }

    const [updatedPlaylist, updateErr] = await api.userPlaylists.update(dispatch, playlistToUpdate);

    if(updateErr) {
        if(updateErr.response && updateErr.response.status !== 500) {
            const responseData = updateErr.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ bot, dispatch, err: updateErr, errMessage: updateErr.message, commandName: "" });
    }

    if(!updatedPlaylist) {
        return dispatch.reply("Playlist failed to update");
    }

    const didNameUpdate: boolean = Boolean(updatedPlaylistName);
    const didPublicUpdate: boolean = Boolean(userPlaylist.is_public !== updatedPlaylist.is_public);

    const didNameUpdateText = didNameUpdate ? ` updated to **${updatedPlaylist.name}**` : '';
    const publicPrivateText = updatedPlaylist.is_public ? `${EMOJIS.UNLOCKED}**Public**` : `${EMOJIS.LOCKED}**Private**`;
    
    return dispatch.reply(
        `**${userPlaylist.name}**` + 
        didNameUpdateText + 
        (didPublicUpdate ? (`${didNameUpdate ? ` and` : ""}` + ` updated to be ${publicPrivateText}`) : "")
    );
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Edit the name and public state of your playlist",
    example: "editplaylist MyPlaylist MyNewPlaylist"
};

export const slashCommand = new SlashCommandBuilder()
.setName("editplaylist")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("name")
    .setDescription("The name of the playlist to edit")
    .setRequired(true)
)
.addStringOption(option => 
    option
    .setName("new")
    .setDescription("The updated name you'd like to give the playlist")
)
.addStringOption(option => 
    option
    .setName("flags")
    .setDescription("Choose which flag to add to the command")
    .addChoices({ name: "Public / Private", value: "-p" })
)

export default EditPlaylist;