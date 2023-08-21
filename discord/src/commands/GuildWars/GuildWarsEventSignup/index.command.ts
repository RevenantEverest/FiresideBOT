import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import viewSignups from './viewSignups/index.js';
import signup from './signup/index.js';

import { FLAGS } from '../../../constants/index.js';
import { flags } from '../../../utils/index.js';

async function GuildWarsEventSignup({ dispatch, args, commandFile }: CommandParams) {

    const argFlags: string[] = flags.getCommandArgFlags(dispatch, args);
    const flagRemovedArgs: string[] = flags.removeFromArgs(args);
    const timezone: string = flags.getTimezone(dispatch, argFlags);

    if(!dispatch.interaction && !flagRemovedArgs[0] || dispatch.interaction && dispatch.interaction) {
        return viewSignups(dispatch, timezone, commandFile);
    }

    return signup(dispatch, flagRemovedArgs, timezone, commandFile);
    
};

export const config: CommandConfig = {
    aliases: ["gwes"],
    permissions: [],
    flags: [FLAGS.TIMEZONE],
    description: "Signup to receive a DM 5 minutes before the signed up Guild Wars 2 event",
    example: "guildWarsEventSignup octovine 5:00 -est"
};

export const slashCommand = new SlashCommandBuilder()
.setName("guildwarseventsignup")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("name")
    .setDescription("The name/title of the event you'd like to signup for")
    .setRequired(true)    
)
.addStringOption(option => 
    option
    .setName("time")
    .setDescription("The time of the event you'd like to signup for")
    .setRequired(true)    
)
.addStringOption(option =>
    option
    .setName("timezone")
    .setDescription("Choose a time zone to convert event time from (Preferably what was used in the event list command)")
)

export default GuildWarsEventSignup;