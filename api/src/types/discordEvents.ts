import { 
    Message, 
    MessageReaction,
    User,
    Role,
    PartialMessage,
    PartialMessageReaction,
    PartialUser,
    PartialRoleData
} from 'discord.js';

export type PotentialMessage = Message | PartialMessage;
export type PotentialMessageReaction = MessageReaction | PartialMessageReaction;
export type PotentialDiscordUser = User | PartialUser;
export type PotentialRole = Role | PartialRoleData;