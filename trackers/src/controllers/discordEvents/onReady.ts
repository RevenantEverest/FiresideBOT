import { Client } from 'discord.js';

import { ENV } from '../../constants/index.js';
import { logs, colors } from '../../utils/index.js';

async function onReady(bot: Client) {

    if(ENV.IS_DEV) {
        return logs.log({ color: colors.success, message: "Discord bot ready" });
    }

    logs.postToLogsChannel({ bot: bot, color: colors.success, title: "GW2 Tracker Ready" });
};

export default onReady;