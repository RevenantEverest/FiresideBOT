import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { Fortune } from '../../../types/entities/Fortune.js';

import * as api from '../../../api/index.js';

import { DEFAULTS, ERROR_MESSAGES } from '../../../constants/index.js';
import { arrays, common, errors } from '../../../utils/index.js';

async function EightBall({ bot, args, dispatch }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.EIGHT_BALL.NO_ARGS);
    }

    const [apiFortunes, apiFortunesErr] = await api.fortunes.getByGuildId(dispatch.guildId, dispatch, { 
        page: 1 
    });

    if(apiFortunesErr) {
        return errors.command({ 
            bot, 
            dispatch, 
            err: apiFortunesErr, 
            errMessage: apiFortunesErr.message, 
            commandName: "EightBall" 
        });
    }

    if(!apiFortunes) {
        return dispatch.reply(DEFAULTS.FORTUNES[common.RNG(DEFAULTS.FORTUNES.length - 1)]);
    }

    const RNG = common.RNG(apiFortunes.count + (DEFAULTS.FORTUNES.length - 1));

    if(RNG > (DEFAULTS.FORTUNES.length + DEFAULTS.API_PAGINATION.LIMIT)) {
        const pageToGet = Math.ceil((RNG - (DEFAULTS.FORTUNES.length - 1)) / DEFAULTS.API_PAGINATION.LIMIT);

        const [res, err] = await api.fortunes.getByGuildId(dispatch.guildId, dispatch, {
            page: pageToGet
        });

        if(err) {
            return errors.command({ 
                bot, 
                dispatch, 
                err, 
                errMessage: err.message, 
                commandName: "EightBall" 
            });
        }

        if(!res) {
            return dispatch.reply(DEFAULTS.FORTUNES[common.RNG(DEFAULTS.FORTUNES.length)]);
        }

        const maxDataFromPage = pageToGet * DEFAULTS.API_PAGINATION.LIMIT;
        const spliceStartIndex = Math.ceil(maxDataFromPage - DEFAULTS.API_PAGINATION.LIMIT);

        const fixedFortunesArr = arrays.generatedFixedArray<Fortune>(apiFortunes.count, apiFortunes.results);
        apiFortunes.results = arrays.replaceElements(fixedFortunesArr, spliceStartIndex, res.results);
    }

    const fortunes = DEFAULTS.FORTUNES.concat(apiFortunes.results.map(fortune => fortune ? fortune.fortune : ""));

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