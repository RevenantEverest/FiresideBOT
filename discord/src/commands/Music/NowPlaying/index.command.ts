import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfig } from '../../../types/commands.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';

async function NowPlaying({ dispatch, server }: CommandParams) {
    if(!server.queue.currentSongEmbed) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NO_SONG_PLAYING);
    }

    return dispatch.reply({ embeds: [server.queue.currentSongEmbed] });
};

export const config: CommandConfig = {
    aliases: ["np"],
    permissions: [],
    description: "Displays the current song embed",
    example: "nowplaying"
};

export const slashCommand = new SlashCommandBuilder()
.setName("nowplaying")
.setDescription(config.description)

export default NowPlaying;