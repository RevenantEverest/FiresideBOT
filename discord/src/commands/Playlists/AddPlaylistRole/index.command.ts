import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

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

    const [playlistRole, err] = await api.guildPlaylistRoles.create(dispatch, { 
        playlist_id: guildPlaylist.id,
        role_id: roleMention
    });

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!playlistRole) {
        return dispatch.reply("No Playlist Role returned");
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