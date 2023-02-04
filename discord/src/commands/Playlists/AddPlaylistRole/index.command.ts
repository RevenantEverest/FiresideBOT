import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';
import { GuildPlaylist } from '../../../types/entities/GuildPlaylist.js';
import { GuildPlaylistRole } from '../../../types/entities/GuildPlaylistRole.js';

import * as api from '../../../api/index.js';
import { ERROR_MESSAGES } from '../../../constants/index.js';
import { regex, errors } from '../../../utils/index.js';

async function AddPlaylistRole({ dispatch, args, commandFile }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.ADD_PLAYLIST_ROLE.NO_ARGS);
    }

    if(!dispatch.interaction && !regex.hasRoleTag(args.join(" "))) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.ADD_PLAYLIST_ROLE.NO_ROLE_MENTION);
    }

    const roleMention = dispatch.interaction?.options.getRole("role")?.id ?? regex.parseRoleTag(args.join(" "));
    const roleRemovedArgs = args.join(" ").replace(regex.roleRegex, "").trim().split(" ");
    const playlistName = dispatch.interaction?.options.getString("name") ?? roleRemovedArgs[0];

    if(!roleMention) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.INVALID_ROLE_ID);
    }

    if(!playlistName) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.ADD_PLAYLIST_ROLE.NO_PLAYLIST_NAME);
    }
    
    const [guildPlaylist, getErr] = await api.guildPlaylists.getByGuildIdAndName(dispatch, dispatch.guildId, playlistName);

    if(getErr || !guildPlaylist) {
        return errors.commandApi<GuildPlaylist>({
            dispatch,
            err: getErr,
            commandFile,
            resource: guildPlaylist,
            missingResourceMessage: "No Playlist found"
        });
    } 

    const [playlistRole, err] = await api.guildPlaylistRoles.create(dispatch, { 
        playlist_id: guildPlaylist.id,
        role_id: roleMention
    });

    if(err || !playlistRole) {
        return errors.commandApi<GuildPlaylistRole>({
            dispatch,
            err,
            commandFile,
            resource: playlistRole,
            missingResourceMessage: "No Playlist Role returned"
        });
    }

    return dispatch.reply(`**<@&${playlistRole.role_id}>** added as a role to server playlist **${guildPlaylist.name}**`);
};

export const config: CommandConfig = {
    aliases: ["apr"],
    permissions: ["ADMINISTRATOR"],
    description: "Add a role to a server playlist",
    example: "addplaylistrole OurPlaylist @MyRole"
};

export const slashCommand = new SlashCommandBuilder()
.setName("addplaylistrole")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("playlist")
    .setDescription("The server playlist you want to add a role to")
    .setRequired(true)
)
.addRoleOption(option => 
    option
    .setName("role")
    .setDescription("The role you want to add to the playlist")
    .setRequired(true)
);

export default AddPlaylistRole;