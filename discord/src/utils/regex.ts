export const userRegex = /<@!?(\d+)>/i;
export const channelRegex = /<#?(\d+)>/i;
export const roleRegex = /<@&?(\d+)>/i;

export const commandFlagRegex = /(?<=-).{1}/gi;
export const commandFlagReplaceRegex = /-.{1}/gi;

export function hasUserTag(str: string): boolean {
    return userRegex.test(str);
};

export function parseUserTag(str: string): string | null {
    const userTag = userRegex.exec(str);
    return userTag ? userTag[1] : null;
};

export function hasChannelTag(str: string): boolean {
    return channelRegex.test(str);
};

export function parseChannelTag(str: string): string | null {
    const channelTag = channelRegex.exec(str);
    return channelTag ? channelTag[1] : null;
};

export function hasRoleTag(str: string): boolean {
    return roleRegex.test(str);
};

export function parseRoleTag(str: string): string | null {
    const roleTag = roleRegex.exec(str);
    return roleTag ? roleTag[1] : null;
};

export function parseCommandFlags(str: string): string[] | null {
    const flags = str.match(commandFlagRegex);
    return flags ?? null;
};