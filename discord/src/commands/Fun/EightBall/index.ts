import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import { DEFAULTS, ERROR_MESSAGES } from '../../../constants/index.js';
import { common } from '../../../utils/index.js';

async function EightBall({ args, dispatch }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.EIGHT_BALL.NO_ARGS);
    }

    const fortunes = DEFAULTS.FORTUNES;
    const RNG = common.RNG(fortunes.length);

    return await dispatch.reply(fortunes[RNG]);
};

export const config: CommandConfigParams = {
    aliases: ["8ball", "fortune"],
    description: "Returns a Yes or No style response",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("eightball")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("question")
    .setDescription("Question to ask the 8 Ball")
    .setRequired(true)
);

export default EightBall;