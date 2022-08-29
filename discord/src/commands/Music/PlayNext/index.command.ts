import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { SongInfo } from '../../../types/youtube.js';

import { ERROR_MESSAGES, PREMIUM_LIMITS } from '../../../constants/index.js';
import { youtube, errors, voiceConnection } from '../../../utils/index.js';
import { ServerSongInfo } from 'src/types/server';

async function PlayNext({ bot, args, dispatch, server, options, userState }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.PLAY.NO_ARGS);
    }

    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    if(options.updatePending) {
        return dispatch.reply(ERROR_MESSAGES.UPDATE_PENDING);
    }

    if(dispatch.interaction) {
        dispatch.interaction.deferReply();
    }

    let request = dispatch.interaction?.options.getString("request") || args.join(" ");
    const isLink: boolean = await youtube.isValidLink(args[0] || request);

    if(isLink) {
        const videoId = await youtube.extractVideoId(request);

        if(!videoId) {
            return dispatch.reply("No Video ID", true);
        }

        request = videoId;
    }

    const [youtubeSearchRes, youtubeSearchErr] = await youtube.handleSearch(request, isLink);

    if(youtubeSearchErr) {
        return errors.command({
            bot,
            dispatch,
            err: youtubeSearchErr,
            errMessage: youtubeSearchErr.message,
            commandName: "PlayNext"
        });
    }

    if(!youtubeSearchRes) {
        return errors.command({
            bot,
            dispatch,
            errMessage: "No Search Results Returned",
            commandName: "PlayNext"
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

export const config: CommandConfigParams = {
    aliases: ["pn"],
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