import { CommandDispatch, CommandFile } from '../../../../types/commands.js';
import { GuildPlaylistUpdate } from '../../../../types/entities/GuildPlaylist.js';

import * as api from '../../../../api/index.js';
import { regex, errors } from '../../../../utils/index.js';

interface Params {
    dispatch: CommandDispatch,
    args: string[],
    commandFile: CommandFile,
    playlistName: string,
    updatedPlaylistName: string | undefined | null,
};

async function handleGuildPlaylist({ dispatch, args, commandFile, playlistName, updatedPlaylistName }: Params) {
    const [guildPlaylist, getErr] = await api.guildPlaylists.getByGuildIdAndName(dispatch, dispatch.guild.id, playlistName);

    if(getErr) {
        if(getErr.response && getErr.response.status !== 500) {
            const responseData = getErr.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ dispatch, err: getErr, errMessage: getErr.message, commandName: commandFile.displayName });
    }

    if(!guildPlaylist) {
        return dispatch.reply("No Server Playlist found");
    }

    const playlistToUpdate: GuildPlaylistUpdate = {
        id: guildPlaylist.id,
        guild_id: guildPlaylist.guild_id
    };

    if(!updatedPlaylistName) {
        return dispatch.reply("Invalid Playlist name");
    }

    playlistToUpdate.name = updatedPlaylistName;

    const [updatedPlaylist, updateErr] = await api.guildPlaylists.update(dispatch, playlistToUpdate);

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

    return dispatch.reply(`**${guildPlaylist.name}** updated to **${updatedPlaylist.name}**`);
};

export default handleGuildPlaylist;