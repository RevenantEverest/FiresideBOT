import { GuildWarsEvent, GuildWarsEventCategory, GuildWarsEventParse } from '../types/guildwarsEvents.js';

import guildwarsEvents from '../resources/guildwarsEvents.json' assert { type: "json" };

export function getEvent(eventName: string, eventTime: string): GuildWarsEventParse | null | undefined {
    const eventFilter: GuildWarsEventCategory = guildwarsEvents.filter((category) => {
        return category.events.some((event) => event.title.toLowerCase() === eventName.toLowerCase())
    })[0];

    const eventData: GuildWarsEvent = eventFilter.events.filter((event) => event.title.toLowerCase() === eventName.toLowerCase())[0];
    const isTimeAvailable = Boolean(eventData.times.filter((time) => time === eventTime)[0]);

    if(!isTimeAvailable) {
        return null;
    }

    return {
        category: eventFilter.category,
        title: eventData.title,
        time: eventTime
    };
};