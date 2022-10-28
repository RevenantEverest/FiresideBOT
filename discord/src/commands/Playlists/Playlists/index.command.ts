import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import viewPlaylists from './viewPlaylists/index.js';
import viewSinglePlaylist from './viewSinglePlaylist/index.js';

import { regex } from '../../../utils/index.js';

async function Playlists({ bot, args, dispatch }: CommandParams) {

    const interaction = dispatch.interaction;

    if(!interaction && !args[0] || interaction && interaction.options.data.length < 1) {
        return viewPlaylists(bot, dispatch, dispatch.author.id);
    }

    let userMention = interaction?.options.getUser("user");

    if(!userMention && regex.hasUserTag(args.join(" "))) {
        const userMentionParse = regex.parseUserTag(args.join(" "));

        if(userMentionParse) {
            args = args.join(" ").replace(regex.userRegex, "").split(" ");
            const guildMember = await dispatch.guild.members.fetch(userMentionParse);
            userMention = guildMember.user;
        }
    }

    const playlistName = interaction?.options.getString("name") ?? args[0];

    if(userMention) {
        if(playlistName) {
            return viewSinglePlaylist(bot, dispatch, userMention.id, playlistName);
        }
        return viewPlaylists(bot, dispatch, userMention.id);
    }

    return viewSinglePlaylist(bot, dispatch, dispatch.author.id, playlistName);
};

export const config: CommandConfigParams = {
    aliases: ['playlist'],
    description: "Reqwuest or display Playlist information",
    example: "playlists Revenant -s"
};

export const slashCommand = new SlashCommandBuilder()
.setName("playlists")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("name")
    .setDescription("The name of the playlist you'd like to request or view")
    .setRequired(false)
)
.addUserOption(option => 
    option
    .setName("user")
    .setDescription("The user you'd like to view the playlist(s) of")
    .setRequired(false)    
)
.addStringOption(option => 
    option
    .setName("flag")
    .setDescription("Choose which flag to add to the command")
    .addChoices({ name: "Inspect", value: "-i" })
    .addChoices({ name: "Shuffle", value: "-s" })
);

export default Playlists;