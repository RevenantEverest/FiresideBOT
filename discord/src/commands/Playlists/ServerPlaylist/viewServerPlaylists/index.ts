import { GuildResolvable } from 'discord.js';
import { CommandDispatch, CommandFile } from '../../../../types/commands.js';

import * as api from '../../../../api/index.js';
import { playlists, errors } from '../../../../utils/index.js';

async function viewServerPlaylists(dispatch: CommandDispatch, guildId: GuildResolvable, commandFile: CommandFile) {
    const [guildPlaylists, err] = await api.guildPlaylists.getByGuildId(dispatch, guildId, {
        page: 1
    });

    if(err) {
        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName })
    }

    if(!guildPlaylists) {
        return dispatch.reply("No Server Playlists found");
    }

    return playlists.sendPlaylistsEmbed({
        dispatch,
        commandFile,
        playlists: guildPlaylists,
        requestId: dispatch.guildId,
        setAuthor: () => ({
            iconURL: dispatch.guild.iconURL({ dynamic: true }) ?? "",
            name: `${dispatch.guild.name} - Server Playlists`
        })
    });
};

export default viewServerPlaylists;