import { Client } from 'discord.js';

import { ENV } from '../../constants/index.js';
import { logs, colors } from '../../utils/index.js';

async function onError(bot: Client, err: Error) {
    const message = "CLIENT ERROR - DISCORD";
    
    logs.error({ color: colors.error, err, message });

    if(ENV.IS_DEV) return;

    logs.postToLogsChannel({ bot: bot, color: colors.error, title: message });
};

export default onError;