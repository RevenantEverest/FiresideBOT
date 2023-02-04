import { CommandDispatch, CommandFile } from '../../../../types/commands.js';

import * as api from '../../../../api/index.js';
import { errors } from '../../../../utils/index.js';

interface Params {
    dispatch: CommandDispatch,
    commandFile: CommandFile,
    playlistName: string,
    parsedId: number
};

async function handleServerPlaylist({ dispatch, commandFile, playlistName, parsedId }: Params) {
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

    const [removedSong, err] = await api.guildSongs.destroy(dispatch, guildPlaylist.id, parsedId);

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }

        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!removedSong) {
        return dispatch.reply("No GuildSong returned");
    }

    return dispatch.reply(`**${removedSong.title}** has been removed from server playlist **${guildPlaylist.name}**`);
};

export default handleServerPlaylist;