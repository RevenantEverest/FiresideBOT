import { UserResolvable } from 'discord.js';
import { CommandDispatch, CommandFile } from '../../../../types/commands.js';

import * as api from '../../../../api/index.js';
import { playlists, errors } from '../../../../utils/index.js';

async function viewPlaylists(dispatch: CommandDispatch, discordId: UserResolvable, commandFile: CommandFile) {

    const [userPlaylists, err] = await api.userPlaylists.getByDiscordId(dispatch, discordId, {
        page: 1
    });

    if(err) {
        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!userPlaylists) {
        return dispatch.reply("No Playlists found");
    }

    const playlistOwner = await dispatch.guild.members.fetch(discordId);

    return playlists.sendPlaylistsEmbed({
        dispatch,
        commandFile,
        playlists: userPlaylists,
        requestId: discordId,
        setAuthor: () => ({
            iconURL: playlistOwner.user.avatarURL({ dynamic: true }) ?? "",
            name: `${playlistOwner.user.username} #${playlistOwner.user.discriminator} - Playlists`
        })
    });
};

export default viewPlaylists;