import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import { apiServices } from '../../../services/index.js';
import { promises, errors } from '../../../utils/index.js';

async function DadJoke({ dispatch, commandFile }: CommandParams) {

    const promise = apiServices.getDadJoke();
    const [res, err] = await promises.handle(promise);

    if(err) {
        return errors.command({
            dispatch,
            err,
            errMessage: "API Error - " + err.message,
            commandName: commandFile.displayName
        });
    }

    if(!res) {
        return errors.command({
            dispatch,
            errMessage: "No data returned from API",
            commandName: commandFile.displayName
        });
    }

    return dispatch.reply(res.data.joke);
};

export const config: CommandConfig = {
    aliases: ["dj"],
    permissions: [],
    description: "Returns a random Dad Joke",
    example: "dadjoke"
};

export const slashCommand = new SlashCommandBuilder()
.setName("dadjoke")
.setDescription(config.description)

export default DadJoke;