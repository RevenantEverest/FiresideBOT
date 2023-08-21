import { UserResolvable } from "discord.js";

export interface GuildWarsEventSignUp {
    id: number,
    discord_id: UserResolvable,
    event_title: string,
    event_time: string,
    created_at: Date
};

export interface GuildWarsEventSignUpCreate {
    discord_id: UserResolvable,
    event_name: string,
    event_time: string,
    timezone: string
};