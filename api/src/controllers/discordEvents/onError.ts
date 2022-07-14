import { Client } from 'discord.js';
import { ENV } from '../../constants/index.js';
import { logs, colors } from '../../utils/index.js';

async function onError(bot: Client, err: Error) {
    const message = "CLIENT ERROR - API";

    if(ENV.IS_DEV) {
        return logs.error({ color: colors.error, err, message: message });
    };

    logs.postToLogsChannel({ bot: bot, color: colors.error, title: "CLIENT ERROR - API" });
};

export default onError;