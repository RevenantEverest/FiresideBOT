import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';
import { SongInfo } from '../../../types/youtube.js';
import { ServerSongInfo } from '../../../types/server';

import { ERROR_MESSAGES, PREMIUM_LIMITS } from '../../../constants/index.js';
import { songRequests, errors, voiceConnection } from '../../../utils/index.js';

async function PlayNext({ bot, args, dispatch, server, options, userState, commandFile }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.PLAY.NO_ARGS);
    }

    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    if(options.updatePending) {
        return dispatch.reply(ERROR_MESSAGES.UPDATE_PENDING);
    }

    let request = dispatch.interaction?.options.getString("request") || args.join(" ");
    const [youtubeSearchRes, youtubeSearchErr] = await songRequests.requestSong(dispatch, request ?? args[0]);

    if(youtubeSearchErr) {
        return errors.command({ 
            dispatch,
            err: youtubeSearchErr,
            errMessage: "",
            commandName: commandFile.displayName
        });
    }

    if(!youtubeSearchRes) {
        return errors.command({
            dispatch,
            errMessage: "No Search Results Returned",
            commandName: commandFile.displayName
        });
    }

    const songInfo: SongInfo = youtubeSearchRes;
    const serverSongInfo: ServerSongInfo = {
        ...songInfo,
        requestedBy: `${dispatch.author.username} #${dispatch.author.discriminator}`
    };

    if(!userState.premium && songInfo.duration > PREMIUM_LIMITS.REQUEST_DURATION) {
        return dispatch.reply(ERROR_MESSAGES.PREMIUM.REQUEST_DURATION, true);
    }

    server.queue.info.splice(0, 0, serverSongInfo);

    dispatch.reply(`**${songInfo.title}** was added to the queue in position **1**`, true);

    if(!server.queue.playing) {
        return voiceConnection.createConnection(bot, dispatch, server, true);
    }
};

export const config: CommandConfig = {
    aliases: ["pn"],
    permissions: [],
    description: "Requests song and adds it to the top of the music queue",
    example: "playnext https://www.youtube.com/watch?v=dQw4w9WgXcQ"
};

export const slashCommand = new SlashCommandBuilder()
.setName("playnext")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("request")
    .setDescription("YouTube Search Request or Link")
    .setRequired(true)    
);

export default PlayNext;