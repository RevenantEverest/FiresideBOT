import { Client } from 'discord.js';
import { ENV } from '../../constants/index.js';
import { logs, colors } from '../../utils/index.js';

async function onPosted(bot: Client) {
    const title = "Top.gg Stats Posted";

    if(ENV.IS_DEV) {
        return logs.log({ color: colors.warning, type: "TOPGG", message: title });
    }

    logs.postToLogsChannel({ bot, color: colors.topgg, title: title });
};

export default onPosted;