const discordTokensController = require('./dbControllers/discordTokensController');
const discordServices = require('../services/discordServices');
const services = {};

services.refreshToken = (discordId, callback) => {
    discordTokensController.getByDiscordId(discordId, handleToken, () => {
        console.log("Invalid Token");
    });

    function handleToken(token) {
        discordServices.refresh_token(token.refresh_token)
        .then(discordToken => {
            let data = {
                id: token.id,
                discord_id: token.discord_id,
                access_token: discordToken.access_token,
                refresh_token: discordToken.refresh_token,
                expires_in: discordToken.expires_in
            };
            updateToken(data)
        })
        .catch(err => console.error(err));
    };

    function updateToken(data) {
        discordTokensController.update(data, (token) => {
            callback(token.access_token);
        });
    };
};

module.exports = services;