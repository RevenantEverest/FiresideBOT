import { UserResolvable } from "discord.js";

export interface GuildWarsEventSignUp {
    id: number,
    discord_id: UserResolvable,
    event_title: string,
    event_time: string,
    created_at: Date
};