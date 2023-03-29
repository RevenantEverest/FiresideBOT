export interface GuildWarsEvent {
    title: string,
    times: string[]
};

export interface GuildWarsEventCategory {
    category: string,
    events: GuildWarsEvent[]
};

export type GuildWarsEventJson = GuildWarsEventCategory[];

export interface GuildWarsEventParse {
    category: string,
    title: string,
    time: string
};