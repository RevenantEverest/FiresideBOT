const discordCurrencyController = require('../../controllers/dbControllers/discordCurrencyController');
const currencyController = require('../../controllers/dbControllers/currencyController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send('Please specify an amount to wager');
    if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send('Please specify an integer value to wager');

    let amountWagered = parseInt(args[1], 10);
    let cSettings = null;

    currencyController.getCurrencySettings(bot, message, "Gamble", message.guild.id, handleRecord, handleNoSettings);

    async function handleRecord(settings) {
        cSettings = settings;
        let data = { discord_id: message.author.id, guild_id: message.guild.id };
        discordCurrencyController.getByDiscordIdAndGuildId(bot, message, "Gamble", data, updateRecord, handleNoRecord);
    };

    async function updateRecord(record) {
        if(record.currency < amountWagered) return message.channel.send(`You can't gamble what you don't have`);
        
        let RNG = Math.floor(Math.random() * 100);
        let newAmount = 0;
        
        RNG > 50 ? newAmount = parseInt(record.currency, 10) + (amountWagered * 2) : newAmount = record.currency - amountWagered;

        let data = { currency: newAmount, discord_id: message.author.id, guild_id: message.guild.id };
        discordCurrencyController.update(bot, message, "Gamble", data, () => {
            return message.channel.send(
                `**${message.author.username}** rolled a **${RNG}** and ${RNG > 50 ? "won" : "lost"} **${(amountWagered * 2).toLocaleString()}** ` + 
                `**${cSettings.currency_name}** and now has **${newAmount.toLocaleString()} ${cSettings.currency_name}**`
            );
        });
    };

    async function handleNoSettings() {
        let data = { guild_id: message.author.id, currency_name: "Kindling", currency_increase_rate: 10 };
        currencyController.saveDefaultSettings(bot, message, "Gamble", data, handleRecord);
    };

    async function handleNoRecord() {
        let data = { discord_id: message.author.id, guild_id: message.guild.id, currency: 0 }
        discordCurrencyController.save(bot, message, "Balance", data, updateRecord);
    };
};

module.exports.config = {
    name: 'gamble',
    d_name: 'Gamble',
    aliases: [],
    params: { required: true, params: 'An amount to wager' },
    category: 'Economy',
    desc: 'Test your luck and win big',
    example: 'gamble 10'
};