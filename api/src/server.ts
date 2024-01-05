import "reflect-metadata";

import AppDataSource from '@@root/db/dataSource.js';
import waitForPostgres from '@@root/db/waitForPostgres.js';
import bot from '@@root/discordBot.js';
import initializeApp from '@@root/app.js';

import { ENV } from '@@constants/index.js';
import { logs, colors } from '@@utils/index.js';

(async function main() {
    await waitForPostgres(AppDataSource);

    bot.login(ENV.DISCORD.KEY);

    const PORT = ENV.API_PORT || 3001;

    const app = initializeApp();

    app.listen(PORT, () => {
        return logs.log({ color: colors.success, type: "HTTP", message: `Fireside-API: Listening on port ${PORT}` });
    });
})();

