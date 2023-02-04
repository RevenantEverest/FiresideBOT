import { CommandDispatch, CommandFile } from '../../../../types/commands.js';

import * as api from '../../../../api/index.js';
import { errors } from '../../../../utils/index.js';

interface Params {
    dispatch: CommandDispatch,
    commandFile: CommandFile,
    playlistName: string,
    request: string
};

async function handleUserPlaylist({ dispatch, commandFile, playlistName, request }: Params) {
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

    const [userSong, err] = await api.userSongs.create(dispatch, { playlist_id: userPlaylist.id, request });

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }

        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!userSong) {
        return dispatch.reply("No playlist returned");
    }

    return dispatch.reply(`**${userSong.title}** added to playlist **${userPlaylist.name}** with ID: **${userSong.id}**`);
};

export default handleUserPlaylist;