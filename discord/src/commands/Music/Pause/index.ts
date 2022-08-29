import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';

async function Pause({ dispatch, server }: CommandParams) {
    if(!server.queue.player) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NO_AUDIO_PLAYER);
    }

    if(server.queue.isPaused && server.queue.connection) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.CURRENTLY_PAUSED);
    }

    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    const canPause = server.queue.player.pause();
    server.queue.isPaused = canPause ? true : false;
    return dispatch.reply(canPause ? "Pausing..." : "Unable to pause current audio player");
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Pauses the current playing song",
    example: "pause"
};

export const slashCommand = new SlashCommandBuilder()
.setName("pause")
.setDescription(config.description)

export default Pause;