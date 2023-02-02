import { CommandDispatch, CommandFile } from '../../../../types/commands.js';
import { UserPlaylistUpdate } from '../../../../types/entities/UserPlaylist.js';

import * as api from '../../../../api/index.js';
import { FLAGS, EMOJIS } from '../../../../constants/index.js';
import { flags, regex, errors } from '../../../../utils/index.js';

interface Params {
    dispatch: CommandDispatch,
    args: string[],
    commandFile: CommandFile,
    playlistName: string,
    updatedPlaylistName: string | undefined | null,
    argFlags: string[]
};

async function handleUserPlaylist({ dispatch, args, commandFile, playlistName, updatedPlaylistName, argFlags }: Params) {
    const [userPlaylist, getErr] = await api.userPlaylists.getByDiscordIdAndName(dispatch, dispatch.author.id, playlistName);

    if(getErr) {
        if(getErr.response && getErr.response.status !== 500) {
            const responseData = getErr.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ dispatch, err: getErr, errMessage: getErr.message, commandName: commandFile.displayName });
    }

    if(!userPlaylist) {
        return dispatch.reply("No Playlist found");
    }

    const playlistToUpdate: UserPlaylistUpdate = { 
        id: userPlaylist.id, 
        discord_id: userPlaylist.discord_id
    };

    if(flags.containsFlag(FLAGS.PRIVATE_TOGGLE, argFlags)) {
        playlistToUpdate.is_public = !userPlaylist.is_public;
    }

    if(updatedPlaylistName) {
        playlistToUpdate.name = updatedPlaylistName;
    }

    const [updatedPlaylist, updateErr] = await api.userPlaylists.update(dispatch, playlistToUpdate);

    if(updateErr) {
        if(updateErr.response && updateErr.response.status !== 500) {
            const responseData = updateErr.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ dispatch, err: updateErr, errMessage: updateErr.message, commandName: commandFile.displayName });
    }

    if(!updatedPlaylist) {
        return dispatch.reply("Playlist failed to update");
    }

    let response = `**${userPlaylist.name}**`;

    if(Boolean(updatedPlaylistName)) {
        response += ` updated to **${updatedPlaylist.name}**`;
    }

    if(Boolean(userPlaylist.is_public !== updatedPlaylist.is_public)) {
        if(Boolean(updatedPlaylistName)) {
            response += " and";
        }

        response += ` updated to be`;

        if(updatedPlaylist.is_public) {
            response += `${EMOJIS.UNLOCKED}**Public**`;
        }
        else {
            response += `${EMOJIS.LOCKED}**Private**`;
        }
    }

    return dispatch.reply(response);
};

export default handleUserPlaylist;