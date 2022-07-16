import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { SongInfo } from '../../../types/youtube.js';

import { ERROR_MESSAGES, PREMIUM_LIMITS } from '../../../constants/index.js';
import { youtube, errors, voiceConnection } from '../../../utils/index.js';

async function Play({ bot, args, dispatch, interaction, server, options, userState }: CommandParams) {
    if(!interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.PLAY.NO_ARGS);
    }

    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    if(options.updatePending) {
        return dispatch.reply(ERROR_MESSAGES.UPDATE_PENDING);
    }

    let request = interaction?.options.getString("request") || args.join(" ");
    const isLink: boolean = await youtube.isValidLink(args[0] || request);

    if(isLink) {
        const videoId = await youtube.extractVideoId(request);

        if(!videoId) {
            return dispatch.reply("No Video ID");
        }

        request = videoId;        
    }

    const [youtubeSearchRes, youtubeSearchErr] = await youtube.handleSearch(request, isLink);

    if(youtubeSearchErr) {
        return errors.handler({ 
            bot, 
            dispatch,
            err: youtubeSearchErr,
            errMessage: "",
            commandName: "Play"
        });
    }

    if(!youtubeSearchRes) {
        return errors.handler({
            bot, 
            dispatch,
            errMessage: "No Search Results Returned",
            commandName: "Play"
        });
    }

    const songInfo: SongInfo = youtubeSearchRes;

    if(!userState.premium && songInfo.duration > PREMIUM_LIMITS.REQUEST_DURATION) {
        return dispatch.reply(ERROR_MESSAGES.PREMIUM.REQUEST_DURATION);
    }

    server.queue.info.push({
        ...songInfo,
        requestedBy: `${dispatch.author.username} #${dispatch.author.discriminator}`
    });
    dispatch.reply(`**${songInfo.title}** was added to the queue in position **${server.queue.info.length}**`);

    if(!server.queue.playing) {
        return voiceConnection.createConnection(bot, dispatch, server);
    }
};

export const config: CommandConfigParams = {
    aliases: ["p"],
    description: "Plays Music",
    example: ""
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