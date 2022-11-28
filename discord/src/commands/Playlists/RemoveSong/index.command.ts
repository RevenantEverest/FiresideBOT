import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import * as api from '../../../api/index.js';
import { errors } from '../../../utils/index.js';

async function RemoveSong({ bot, args, dispatch, commandFile }: CommandParams) {
    const interaction = dispatch.interaction;

    if(!interaction && !args[0]) {
        return dispatch.reply("ajsdhflajksdf");
    }

    const playlistName = interaction?.options.getString("playlist") ?? args[0];
    const parsedID = interaction?.options.getNumber("id") ?? parseInt(args[1], 10);

    if(!Number.isInteger(parsedID)) {
        return dispatch.reply("asjdhflakjsdf");
    }

    const [userPlaylist, getErr] = await api.userPlaylists.getByDiscordIdAndName(dispatch, dispatch.author.id, playlistName);

    if(getErr) {
        if(getErr.response && getErr.response.status !== 500) {
            const responseData = getErr.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ bot, dispatch, err: getErr, errMessage: getErr.message, commandName: commandFile.displayName });
    }

    if(!userPlaylist) {
        return dispatch.reply("No Playlist found");
    }

    const [removedSong, err] = await api.userSongs.destroy(dispatch, userPlaylist.id, parsedID);

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }

        return errors.command({ bot, dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!removedSong) {
        return dispatch.reply("No UserSong returned");
    }

    return dispatch.reply(`**${removedSong.title}** has been removed from playlist **${userPlaylist.name}**`);
};

export const config: CommandConfigParams = {
    aliases: ["rs"],
    description: "Removes a song from a playlist",
    example: "removesong 56"
};

export const slashCommand = new SlashCommandBuilder()
.setName("removesong")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("playlist")
    .setDescription("The name of the playlist you wish to remove a song from")
    .setRequired(true)
)
.addNumberOption(option => 
    option
    .setName("id")
    .setDescription("The ID of the song you wish to remove. Can be found using /playlists <Playlist Name>")
    .setRequired(true)
);

export default RemoveSong;