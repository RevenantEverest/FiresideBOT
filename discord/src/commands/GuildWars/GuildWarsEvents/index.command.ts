import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandConfig, CommandParams } from '../../../types/commands.js';

import viewUpcoming from './viewUpcoming/index.js';
import viewEvents from './viewEvents/index.js';

import * as api from '../../../api/index.js';

import { FLAGS } from '../../../constants/index.js';
import { colors, errors, flags } from '../../../utils/index.js';
import dayjs from 'dayjs';

async function GuildWarsEvents({ dispatch, args, commandFile }: CommandParams) {

    const argFlags: string[] = flags.getCommandArgFlags(dispatch, args);
    const flagRemovedArgs: string[] = flags.removeFromArgs(args);
    const timezone: string = flags.getTimezone(dispatch, argFlags);

    if(flags.containsFlag(FLAGS.UPCOMING, argFlags)) {

        const [guildwarsEvents, err] = await api.guildwarsEvents.getUpcoming(dispatch, {
            page: 1
        });
        
        if(err || !guildwarsEvents) {
            return errors.commandApi({
                dispatch,
                commandFile,
                err,
                resource: guildwarsEvents,
                missingResourceMessage: "No Events Returned"
            });
        }

        return viewUpcoming(dispatch, guildwarsEvents, timezone);
    }

    const search = dispatch.interaction?.options.getString("search") ?? flagRemovedArgs[0];

    const [guildwarsEvents, err] = await api.guildwarsEvents.search(dispatch, search, {
        page: 1
    });

    if(err || !guildwarsEvents) {
        return errors.commandApi({
            dispatch,
            commandFile,
            err,
            resource: guildwarsEvents,
            missingResourceMessage: "No Events Returned"
        });
    }
    
    return viewEvents(dispatch, guildwarsEvents, search, timezone);
};

export const config: CommandConfig = {
    aliases: ["gwe"],
    permissions: [],
    flags: [FLAGS.TIMEZONE],
    description: "Displays a list of the Guild Wars 2 events and their times",
    example: "guildwarsevents -est"
};

export const slashCommand = new SlashCommandBuilder()
.setName("guildwarsevents")
.setDescription(config.description)
.addStringOption(option =>
    option
    .setName("timezone")
    .setDescription("Choose a time zone abbreviation to display results in")
)
.addStringOption(option => 
    option
    .setName("search")
    .setDescription("Search for either an event category or specific event")
);

export default GuildWarsEvents;