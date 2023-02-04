import { CommandDispatch, CommandFile } from '../../../../types/commands.js';

import * as api from '../../../../api/index.js';
import { errors } from '../../../../utils/index.js';

interface Params {
    dispatch: CommandDispatch,
    commandFile: CommandFile,
    playlistName: string,
    request: string
};

async function handleGuildPlaylist({ dispatch, commandFile, playlistName, request }: Params) {
    const [guildPlaylist, getErr] = await api.guildPlaylists.getByGuildIdAndName(dispatch, dispatch.guildId, playlistName);

    if(getErr) {
        if(getErr.response && getErr.response.status !== 500) {
            const responseData = getErr.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ dispatch, err: getErr, errMessage: getErr.message, commandName: commandFile.displayName });
    }

    if(!guildPlaylist) {
        return dispatch.reply("No Playlist found");
    }

    const [guildSong, err] = await api.guildSongs.create(dispatch, { playlist_id: guildPlaylist.id, request });

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }

        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!guildSong) {
        return dispatch.reply("No playlist returned");
    }

    return dispatch.reply(`**${guildSong.title}** added to server playlist **${guildPlaylist.name}** with ID: **${guildSong.id}**`);
};

export default handleGuildPlaylist;