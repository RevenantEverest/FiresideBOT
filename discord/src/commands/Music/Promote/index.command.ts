import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfig } from '../../../types/commands.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';

async function Promote({ args, dispatch, server }: CommandParams) {
    if(server.queue.info.length < 1) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NO_SONGS_IN_QUEUE);
    }

    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.PROMOTE.NO_ARGS);
    }

    const queueNumber = dispatch.interaction?.options.getNumber("index") ?? parseInt(args[0], 10);

    if(!Number.isInteger(queueNumber)) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.PROMOTE.QUEUE_NUMBER_NOT_A_NUMBER);
    }

    if(queueNumber > server.queue.info.length) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.PROMOTE.QUEUE_NUMBER_EXCEEDS_QUEUE_LENGTH);
    }

    const queueElement = server.queue.info[queueNumber - 1];

    server.queue.info.splice(queueNumber - 1, 1);
    server.queue.info.splice(0, 0, queueElement);

    return dispatch.reply(`**${queueElement.title}** was promoted to next in queue`);
};

export const config: CommandConfig = {
    aliases: [],
    permissions: [],
    description: "Promotes a song in queue to be the next played",
    example: "promote 8"
};

export const slashCommand = new SlashCommandBuilder()
.setName("promote")
.setDescription(config.description)
.addNumberOption(option => 
    option
    .setName("index")
    .setDescription("The music queue number to promote")
    .setRequired(true)
)

export default Promote;