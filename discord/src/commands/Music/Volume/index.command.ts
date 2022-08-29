import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';

async function Volume({ args, dispatch, server, guildSettings }: CommandParams) {
    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    const volumeInput = dispatch.interaction?.options.getNumber("volume") || parseInt(args[0], 10);

    if(!volumeInput) {
        return dispatch.reply(`Current Volume: **${server.queue.options.volume}**`);
    }
    
    if(!Number.isInteger(volumeInput)) {
        return dispatch.reply(ERROR_MESSAGES.INVALID_INTEGER);
    }
    else if(volumeInput > 100) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.VOLUME.GREATER_THAN_EXPECTED);
    }

    if(server.queue.resource && server.queue.resource.volume) {
        server.queue.resource.volume.setVolume(volumeInput / 100);
    }
    
    server.queue.options.volume = volumeInput;

    const [volumeUpdate, volumeUpdateErr] = await api.guildSettings.update(dispatch.guildId, dispatch, {
        ...guildSettings,
        volume: volumeInput
    });

    if(volumeUpdateErr) {
        return console.error(volumeUpdateErr);
    }

    if(!volumeUpdate) {
        return console.log("No return in volume");
    }

    guildSettings.volume = volumeUpdate.volume;

    return dispatch.reply(`Volume set to: **${guildSettings.volume}**`);
};

export const config: CommandConfigParams = {
    aliases: ["vol"],
    description: "Change the volume of Fireside",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("volume")
.setDescription(config.description)
.addNumberOption(option => 
    option
    .setName("volume")
    .setDescription("A value between 1 and 100")
)

export default Volume;