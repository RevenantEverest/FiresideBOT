import Discord, { Client } from 'discord.js';
import { GuildWarsEvent } from '../../types/guildwarsEvents.js';

import * as api from '../../api/index.js';

import { IMAGE_RESOURCES } from '../../constants/index.js';
import { colors, logs } from '../../utils/index.js';

async function getEventSignups(bot: Client, event: GuildWarsEvent, timestamp: string, page?: number) {
    const [eventSignups, err] = await api.guildwarsEventSignups.getByEventNameAndTime(event.title, timestamp, {
        page: page ?? 1
    });

    if(err || !eventSignups) {
        if(err?.response?.status === 404) {
            return logs.error({ color: colors.error, message: `404 - Event Signups for ${event.title} not found` });
        }
        return logs.error({ color: colors.error, err, message: err?.message ?? "Error Fetching Event Signups" });
    }

    for(let i = 0; i < eventSignups.results.length; i++) {
        const eventSignup = eventSignups.results[i];
        const discordUser = await bot.users.fetch(eventSignup.discord_id);

        const embed = new Discord.MessageEmbed({
            color: colors.guildwars,
            thumbnail: {
                url: IMAGE_RESOURCES.GW2_LOGO
            },
            title: event.title,
            description: `Starting in 5 minutes`
        });

        discordUser.send({ embeds: [embed] });
    };

    if(eventSignups.next) {
        getEventSignups(bot, event, timestamp, 2);
    }
};

export default getEventSignups;