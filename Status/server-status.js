require('dotenv').config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const chalk = require('chalk');
const controller = require('./controllers/statusCheckerController');

async function getDate() {
    let date = new Date();
    let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    return `${date.toLocaleString('en-US', options)} EST`;
};

bot.on("ready", async () => {
    if(process.env.ENVIRONMENT === "DEV") return cbotonsole.log(chalk.hex('#00ff00')('[LOG]') + '  Status Checker Ready');

    let embed = new Discord.RichEmbed();
    embed.setColor(0xff9900).setTitle("Status Checker Starting up...").setFooter(await getDate());

    bot.channels.get("543862697742172179").send(embed);

    setInterval(() => {
        controller.checkAPI(bot);
        controller.checkDBL(bot);
        controller.checkDiscord(bot);
        controller.checkLogger(bot);
        controller.checkTwitchTracker(bot);
    }, 120000);
});

bot.on("error", () => {
    if(process.env.ENVIRONMENT === "DEV") return console.log(chalk.hex('#ff0000')('[ERROR]') + ' CLIENT ERROR', err);

    let embed = new Discord.RichEmbed();
    embed.setColor(0xff0000).setTitle("Status Checker - CLIENT ERROR").setFooter(getDate());

    bot.channels.get("543862697742172179").send(embed);
});

bot.login(process.env.DISCORD_KEY);