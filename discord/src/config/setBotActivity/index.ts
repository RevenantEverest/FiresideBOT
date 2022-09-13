import config from '../index.js';
import bot from '../../discordBot.js';
import { ActivityOptions } from 'discord.js';

import { common } from '../../utils/index.js';

function getActivityList(): ActivityOptions[] {
    return [
        { name: "The Campfire | ?help", type: "WATCHING" },
        { name: `Serving ${config.userCount.toLocaleString()} Users`, type: "PLAYING" },
        { name: `Serving ${config.guildCount.toLocaleString()} Users`, type: "PLAYING" },
        { name: "help.firesidebot.com", type: "PLAYING" },
        { name: `v${config.version}`, type: "PLAYING" }
    ];
};

function setBotActivity() {

    if(!bot.user) return;

    bot.user.setActivity(getActivityList()[0]);

    setInterval(() => {
        if(!bot.user) return;

        const RNG = common.RNG(getActivityList().length); 
        bot.user.setActivity(getActivityList()[RNG]);
    }, 120 * 60000);
};

export default setBotActivity;
