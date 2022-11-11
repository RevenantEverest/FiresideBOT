import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { SongInfo } from '../../../types/youtube.js';

import { ERROR_MESSAGES, PREMIUM_LIMITS } from '../../../constants/index.js';
import { songRequests, errors, voiceConnection } from '../../../utils/index.js';

async function Play({ bot, args, dispatch, server, options, userState }: CommandParams) {
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
    const [youtubeSearchRes, youtubeSearchErr] = await songRequests.requestSong(request ?? args[0]);

    if(youtubeSearchErr) {
        return errors.command({ 
            bot, 
            dispatch,
            err: youtubeSearchErr,
            errMessage: "",
            commandName: "Play"
        });
    }

    if(!youtubeSearchRes) {
        return errors.command({
            bot, 
            dispatch,
            errMessage: "No Search Results Returned",
            commandName: "Play"
        });
    }

    const songInfo: SongInfo = youtubeSearchRes;

    if(!userState.premium && songInfo.duration > PREMIUM_LIMITS.REQUEST_DURATION) {
        return dispatch.reply(ERROR_MESSAGES.PREMIUM.REQUEST_DURATION, true);
    }

    server.queue.info.push({
        ...songInfo,
        requestedBy: `${dispatch.author.username} #${dispatch.author.discriminator}`
    });
    
    dispatch.reply(`**${songInfo.title}** was added to the queue in position **${server.queue.info.length}**`, true);

    if(!server.queue.playing) {
        return voiceConnection.createConnection(bot, dispatch, server, true);
    }
};

export const config: CommandConfigParams = {
    aliases: ["p"],
    description: "Requests song and plays it or adds it to the music queue",
    example: "play https://www.youtube.com/watch?v=dQw4w9WgXcQ"
};

export const slashCommand = new SlashCommandBuilder()
.setName("play")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("request")
    .setDescription("YouTube Search Request or Link")
    .setRequired(true)
);

export default Play;