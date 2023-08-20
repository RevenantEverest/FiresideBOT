import cron from 'node-cron';
import dayjs from 'dayjs';

import * as guildwarsController from './controllers/guildwars/index.js';
import bot from './discordBot.js';

import { ENV } from './constants/index.js';
import { colors, logs, promises } from './utils/index.js';

(async function main() {

    bot.login(ENV.DISCORD.KEY);

    await promises.waitFor(() => bot.isReady(), {
        retries: 10,
        intervalLength: 2000
    });

    const task = cron.schedule("*/5 * * * *", () => {
        logs.log({ color: colors.success, message: `Starting GW2 Event Tracker - ${dayjs().format("M/D/YY HH:mm:ss")}` });

        const timestamp = dayjs().add(5, "minute").add(1, "hour").format("HH:mm");

        guildwarsController.getUpcomingEvents(bot, timestamp);
    });

    task.start();
})();
