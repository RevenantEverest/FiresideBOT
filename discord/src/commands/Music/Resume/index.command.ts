import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';

async function Resume({ dispatch, server }: CommandParams) {
    if(!server.queue.player) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NO_AUDIO_PLAYER);
    }

    if(!server.queue.isPaused && server.queue.connection) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.ALREADY_PLAYING);
    }

    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    const canUnPause = server.queue.player.unpause();
    server.queue.isPaused = canUnPause ? false : true;
    return dispatch.reply(canUnPause ? "Resuming..." : "Unable to resume current audio player");
};

export const config: CommandConfig = {
    aliases: [],
    permissions: [],
    description: "Pauses the current playing song",
    example: "pause"
};

export const slashCommand = new SlashCommandBuilder()
.setName("resume")
.setDescription(config.description)

export default Resume;