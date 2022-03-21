import { TextChannel } from 'discord.js';

export type TextChannelReturn = Promise<[TextChannel | undefined, Error | undefined]>