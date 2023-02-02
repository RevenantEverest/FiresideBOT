import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import viewServerPlaylists from './viewServerPlaylists/index.js';
import viewSingleServerPlaylist from './viewSingleServerPlaylist/index.js';

import { FLAGS } from '../../../constants/index.js';

async function ServerPlaylist({ bot, args, server, dispatch, commandFile, options }: CommandParams) {
    const interaction = dispatch.interaction;

    if(!interaction && !args[0]) {
        return viewServerPlaylists(dispatch, dispatch.guildId, commandFile);
    }

    const playlistName = interaction?.options.getString("name") ?? args[0];

    return viewSingleServerPlaylist({
        bot,
        dispatch,
        args,
        server,
        options,
        playlistName,
        guildId: dispatch.guild.id,
        commandFile
    });
};

export const config: CommandConfigParams = {
    aliases: ["sp"],
    flags: [FLAGS.INFO, FLAGS.SHUFFLE, FLAGS.GUILD_PLAYLIST_ROLES],
    description: "Display or request a server playlist to be added to the queue",
    example: "serverplaylist MyFavoriteSongs"
};

export const slashCommand = new SlashCommandBuilder()
.setName("serverplaylist")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("name")
    .setDescription("The name of the server playlist you like to request or view")
    .setRequired(true)    
)
.addStringOption(option => 
    option
    .setName("flag")
    .setDescription("Choose which flag to add to the command")
    .addChoices({ name: FLAGS.INFO.name, value: FLAGS.INFO.usageSymbol[0] })
    .addChoices({ name: FLAGS.SHUFFLE.name, value: FLAGS.SHUFFLE.usageSymbol[0] })
    .addChoices({ name: FLAGS.GUILD_PLAYLIST_ROLES.name, value: FLAGS.GUILD_PLAYLIST_ROLES.usageSymbol[0] })
);

export default ServerPlaylist;