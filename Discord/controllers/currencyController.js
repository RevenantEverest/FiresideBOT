const currencyDB = require('../../models/currencyDB');
const discordCurrencyDB = require('../../models/discordCurrencyDB');

module.exports = {
    updateCurrency(message) {
        let currencyPromises = [
            currencyDB.findCurrencySettings(message.guild.id),
            discordCurrencyDB.findByDiscordIdAndGuildId({ discord_id: message.author.id, guild_id: message.guild.id })
        ];

        Promise.all(currencyPromises).then(currencyData => {
            let c_Settings = currencyData[0];
            let u_Currency = currencyData[1];
            let updatedCurrency = parseInt(u_Currency.currency, 10) + c_Settings.currency_increase_rate;
            discordCurrencyDB.update({ currency: updatedCurrency.toString(), discord_id: message.author.id, guild_id: message.guild.id })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
}