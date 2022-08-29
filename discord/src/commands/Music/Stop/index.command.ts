import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';

async function Stop({ dispatch, server }: CommandParams) {
    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    if(!server.queue.connection) {
        if(server.queue.info.length < 1) {
            return dispatch.reply(ERROR_MESSAGES.COMMANDS.STOP.NO_CONNECTION);
        }

        server.queue.info = [];
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.STOP.NO_CONNECTION_QUEUE_CLEARED);
    }

    server.queue.connection.destroy();
    return dispatch.reply("Bye, thanks for listening!");
};

export const config: CommandConfigParams = {
    aliases: ["quit"],
    description: "Stops playing music, clears queue and leaves voice channel",
    example: "stop"
};

export const slashCommand = new SlashCommandBuilder()
.setName("stop")
.setDescription(config.description)

export default Stop;