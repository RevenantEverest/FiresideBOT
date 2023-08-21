import { Flag } from '../types/flags.js';
import { CommandDispatch } from '../types/commands.js';

import { FLAGS } from '../constants/index.js';

import * as regex from './regex.js';

export function containsFlag(flagConstant: Flag, stringFlags: string[]): boolean {
    return flagConstant.usageSymbol.some(symbol => stringFlags.includes(symbol));
};

export function getCommandArgFlags(dispatch: CommandDispatch, args: string[]): string[] {
    const interactionFlags = dispatch.interaction?.options.getString("flags");

    if(interactionFlags) {
        return [interactionFlags];
    }
    
    return regex.parseCommandFlags(args.join(" ")) ?? [];
};

export function removeFromArgs(args: string[]): string[] {
    return args.join(" ").replace(regex.commandFlagReplaceRegex, "").split(" ").filter(Boolean);
};

/**
 * Exception function for getting timezone flag. Slash commands limit choices to 25, so this function aims to 
 * grab user input "timezone" option from interaction instead of pre determined list of timezone abbreviations
 * @param dispatch: CommandDispatch
 * @param argFlags: string[]
 * @returns string | null
 */
export function getTimezone(dispatch: CommandDispatch, argFlags: string[]): string {
    const interactionTimezone = dispatch.interaction?.options.getString("timezone");
    const tz = interactionTimezone ? [interactionTimezone] : argFlags.filter((arg) => FLAGS.TIMEZONE.usageSymbol.includes(arg.toLowerCase()));
    
    if(containsFlag(FLAGS.TIMEZONE, tz)) {
        return tz[0];
    }

    return "utc";
};