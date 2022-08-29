import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';
import { arrays } from '../../../utils/index.js';

async function Shuffle({ dispatch, server }: CommandParams) {
    if(server.queue.info.length < 1) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NO_SONGS_IN_QUEUE);
    }

    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    server.queue.info = arrays.shuffle(server.queue.info);
    return dispatch.reply("Queue Shuffled");
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Shuffle the current music queue",
    example: "shuffle"
};

export const slashCommand = new SlashCommandBuilder()
.setName("shuffle")
.setDescription(config.description)

export default Shuffle;