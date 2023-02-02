import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import * as api from '../../../api/index.js';
import { ERROR_MESSAGES } from '../../../constants/index.js';
import { flags, regex, errors } from '../../../utils/index.js';

async function AddPlaylistRole({ dispatch, args }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply();
    }

    if(!regex.hasRoleTag(args.join(" "))) {
        return dispatch.reply();
    }

    const argFlags = flags.getCommandArgFlags(dispatch, args);
    const roleMention = regex.parseRoleTag(args.join(" "));
    const roleRemovedArgs = args.join(" ").replace(regex.roleRegex, "").split(" ");
    const flagsRemovedArgs = flags.removeFromArgs(roleRemovedArgs);
    const playlistName = dispatch.interaction?.options.getString("name") ?? flagsRemovedArgs[0];

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
};

export const config: CommandConfigParams = {
    aliases: ["apr"],
    permissions: [],
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