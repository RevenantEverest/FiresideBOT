export interface GuildWarsEvent {
    title: string,
    times: string[]
};

export interface GuildWarsEventCategory {
    category: string,
    events: GuildWarsEvent[]
};

export type GuildWarsEventJson = GuildWarsEventCategory[];

export interface GuildWarsGetEvent {
    category: string,
    title: string,
    time: string
};

export interface GuildWarsEventParse {
    category: string,
    title: string,
    times: string[]
};