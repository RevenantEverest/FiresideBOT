import { GuildWarsGetEvent, GuildWarsEventParse } from '../types/guildwarsEvents.js';

import guildwarsEvents from '../resources/guildwarsEvents.json' assert { type: "json" };

export function getEvent(eventName: string, eventTime: string): GuildWarsGetEvent | null | undefined {
    const events = parse();
    const eventSearch = events.filter((event) => event.title.toLowerCase() === eventName.toLowerCase() && event.times.includes(eventTime))[0];

    if(!eventSearch) {
        return null;
    }

    return {
        category: eventSearch.category,
        title: eventSearch.title,
        time: eventTime
    };
};

export function parse(): GuildWarsEventParse[] {
    const events = [];

    for(let i = 0; i < guildwarsEvents.length; i++) {
        const event = guildwarsEvents[i];

        for(let x = 0; x < event.events.length; x++) {
            const e = event.events[x];

            events.push({
                category: event.category,
                title: e.title,
                times: e.times
            });
        };
    };

    return events;
}