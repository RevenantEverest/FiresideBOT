import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';
import { dates, errors } from '../../../utils/index.js';

async function RemoveGuildWarsEventSignup({ dispatch, args, commandFile }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS);
    }

    const id = dispatch.interaction?.options.getNumber("id") ?? parseInt(args[0], 10);

    if(!Number.isInteger(id)) {
        return dispatch.reply(ERROR_MESSAGES.INVALID_INTEGER);
    }

    const [eventSignup, getErr] = await api.guildwarsEventSignups.getOne(dispatch, id);

    if(getErr || !eventSignup) {
        return errors.commandApi({
            dispatch,
            commandFile,
            err: getErr,
            resource: eventSignup,
            missingResourceMessage: "No Event Signup Returned"
        })
    }

    const [eventSignupDelete, err] = await api.guildwarsEventSignups.destroy(dispatch, eventSignup);

    if(err || !eventSignupDelete) {
        return errors.commandApi({
            dispatch,
            commandFile,
            err,
            resource: eventSignupDelete,
            missingResourceMessage: "No Deleted Event Signup Returned"
        });
    }

    const formattedDate = dates.format(eventSignupDelete.event_time, {
        timestampFormat: "HH:mm",
        timeFormat: "h:mma"
    });

    return dispatch.reply(`Unsubscribed from **${eventSignupDelete.event_title}** at **${formattedDate.time} UTC**`);
};

export const config: CommandConfig = {
    aliases: ["rgwes"],
    permissions: [],
    description: "Removes a Guild Wars event signup",
    example: "removeGuildWarsEventSignup 32"
};

export const slashCommand = new SlashCommandBuilder()
.setName("removeguildwarseventsignup")
.setDescription(config.description)
.addNumberOption(option => 
    option
    .setName("id")
    .setDescription("The ID of the Guild Wars Event Signup you'd like to unsubscribe from")
    .setRequired(true)    
);

export default RemoveGuildWarsEventSignup;