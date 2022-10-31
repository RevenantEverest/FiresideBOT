import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import { apiServices } from '../../../services/index.js';
import { promises, errors } from '../../../utils/index.js';

async function DadJoke({ bot, dispatch }: CommandParams) {

    const promise = apiServices.getDadJoke();
    const [res, err] = await promises.handle(promise);

    if(err) {
        return errors.command({
            bot, 
            dispatch,
            err,
            errMessage: "API Error - " + err.message,
            commandName: "DadJoke"
        });
    }

    if(!res) {
        return errors.command({
            bot, 
            dispatch,
            errMessage: "No data returned from API",
            commandName: "DadJoke"
        });
    }

    return dispatch.reply(res.data.joke);
};

export const config: CommandConfigParams = {
    aliases: ["dj"],
    description: "Returns a random Dad Joke",
    example: "dadjoke"
};

export const slashCommand = new SlashCommandBuilder()
.setName("dadjoke")
.setDescription(config.description)

export default DadJoke;