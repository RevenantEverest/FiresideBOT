const config = require('../config/config');
const Discord_Bot = require('../Discord_Bot');
const discordServices = require('../services/discordServices');
const discord_tokenDB = require('../models/discord_tokenDB');
const services = {};

services.handleRefreshToken = (data, callback) => {
    discordServices.refresh_token(data.refresh_token)
        .then(results => {
            console.log(results.data);
        })
        .catch(err => console.log(err));
};

module.exports = {
    getGuilds(req, res, next) {
        discord_tokenDB.findByDiscordId(req.params.id)
        .then(results => {
            discordServices.getUserGuilds(results.token)
            .then(guilds => res.json({message: "Getting User Guilds", data: guilds.data}))
            .catch(err => {
                console.error(err);
                // if(err.response.status === 401)
                //     services.handleRefreshToken(results, this.getGuilds);
            });
        })
        .catch(err => next(err));
    },
    getUserInfo(req, res, next) {
        discord_tokenDB.findByDiscordId(req.params.id)
        .then(results => {
            discordServices.getUserInfo(results.token)
            .then(info => res.json({ message: "Getting Discord User Info", data: info.data }))
            .catch(err => console.log(err.response.status));
        })
        .catch(err => next(err));
    },
    getBotUserSize(req, res, next) {
        res.json({ message: "Getting Discord Users Count", data: config.info.userCount });
    },
    getGuildTextChannels(req, res, next) {
        let channels = Discord_Bot.guilds.get(req.params.id).channels.array().filter(el => el.type === "text").map(el => { return { id: el.id, name: el.name } });
        res.json({ message: "Getting Guild Text Channels", data: channels })
    },
    getGuildRoles(req, res, next) {
        let roles = Discord_Bot.guilds.get(req.params.id).roles.array().map(el => { return {name: el.name, id: el.id} })
        res.json({ message: "Getting Guild Roles", data: roles });
    }
};