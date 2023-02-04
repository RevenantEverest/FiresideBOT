import { Flag } from '../types/flags.js';
import { CommandDispatch } from '../types/commands.js';

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