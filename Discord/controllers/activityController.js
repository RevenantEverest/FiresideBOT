const config = require('../../config/config');

async function setBotActivity(bot) {
    const activities = [
        {value: "The Campfire | ?help", type: "WATCHING"},
        {value: `Serving ${config.Discord_Users_Count} Users`, type: "PLAYING"},
        {value: `Serving ${bot.guilds.array().length} Servers`, type: "PLAYING"},
        {value: "help.firesidebot.com", type: "PLAYING"}
    ];
    let RNG = Math.floor(Math.random() * activities.length)
    bot.user.setActivity(activities[RNG].value, {type: activities[RNG].type})
};

module.exports = {
    handleActivity(bot) {
        bot.user.setActivity("The Campfire | ?help", {type: "WATCHING"});
        setInterval(() => {
            setBotActivity(bot);
        }, 7200000);
    }
};