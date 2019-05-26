const config = require('../config/config');
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

// const pgp = require('pg-promise')();
// const QRE = pgp.errors.QueryResultError;
// const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    getGuilds(req, res, next) {
        discord_tokenDB.findByDiscordId(req.params.id)
            .then(results => {
                discordServices.getUserGuilds(results.token)
                    .then(guilds => {
                        res.json({message: "Getting User Guilds", data: guilds.data})
                    })
                    .catch(err => {
                        console.error(err);
                        // if(err.response.status === 401)
                        //     services.handleRefreshToken(results, this.getGuilds);
                    })
            })
            .catch(err => {
                next(err);
                //Log Error
            })
    },
    getUserInfo(req, res, next) {
        discord_tokenDB.findByDiscordId(req.params.id)
            .then(results => {
                discordServices.getUserInfo(results.token)
                .then(info => {
                    res.json({ message: "Getting Discord User Info", data: info.data });
                })
                .catch(err => {
                    //Handle 401 Response
                    console.log(err.response.status);
                })
            })
            .catch(err => {
                next(err);
                // Log Error
                //Potentially Handle No Access Token
            })
    },
    getBotUserSize(req, res, next) {
        // res.json({message: "Getting Discord Users Count", data: config.Discord_Options.users});
        res.json({message: "Getting Discord Users Count", data: config.info.userCount});
    }
};