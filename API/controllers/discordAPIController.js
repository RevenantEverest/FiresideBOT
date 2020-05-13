const config = require('../config/config');
const Discord_Bot = require('../Discord_Bot');
const discordServices = require('../services/discordServices');
const discordTokensController = require('./dbControllers/discordTokensController');
const refreshTokenController = require('./refreshTokenController');
const services = {};

services.getGuilds = (req, res, next) => {
    discordTokensController.getByDiscordId(req.params.id, getUserGuilds, () => {
        next(err);
    });

    function getUserGuilds(token) {
        discordServices.getUserGuilds(token.access_token)
        .then(guilds => res.json({ data: guilds.data }))
        .catch(err => {
            if(err.response) {
                if(err.response.status === 401)
                    return refreshTokenController.refreshToken(req.params.id, getUserGuilds);
            }
            else next(err);
        });
    };
};

services.getUserInfo = (req, res, next) => {
    discordTokensController.getByDiscordId(req.params.id, gatherUserInfo, () => {
        next(err);
    });

    function gatherUserInfo(token) {
        discordServices.getUserInfo(token.access_token)
        .then(userInfo => res.json({ data: userInfo.data }))
        .catch(err => {
            if(err.response) {
                if(err.response.status === 401)
                    return refreshTokenController.refreshToken(req.params.id, gatherUserInfo);
            }
            else next(err);
        });
    };
};

services.getBotUserSize = (req, res, next) => {
    res.json({ data: config.info.userCount });
};

services.getGuildTextChannels = (req, res, next) => {
    let channels = Discord_Bot.guilds.get(req.params.id).channels.array().filter(el => el.type === "text").map(el => { return { id: el.id, name: el.name } });
    res.json({ message: "Getting Guild Text Channels", data: channels });
};

services.getGuildRoles = (req, res, next) => {
    let roles = Discord_Bot.guilds.get(req.params.id).roles.array().map(el => { return {name: el.name, id: el.id} })
    res.json({ message: "Getting Guild Roles", data: roles });
};

module.exports = services;