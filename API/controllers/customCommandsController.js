const db = require('../models/customCommandsDB');
const bot = require('../Discord_Bot');

const moment = require('moment');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(commands => res.json({ message: 'Getting Custom Commands', data: commands }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Custom Commands Found", data: [] });
            else next(err);
        });
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(command => res.json({ message: "Getting Custom Command", data: command }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Custom Commands Found", data: [] });
            else next(err);
        });
    },
    getByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(commands => {
            let commandData = [];
            commands.forEach(el => {
                let discordUser = bot.guilds.resolve(req.params.id).members.resolve(el.created_by) || null;
                let discord_username = null;
                let avatarURL = null;
                if(discordUser) {
                    discord_username = discordUser.user.username;
                    avatarURL = discordUser.user.avatar;
                }
                commandData.push({ 
                    id: el.id, input: el.input,
                    output: el.output, date: el.date, 
                    discord_username: discord_username, created_by: el.created_by, 
                    guild_id: el.guild_id, avatarUrl: avatarURL
                })
            })
            res.json({ message: "Getting Commands", data: commandData })
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Custom Commands Found", data: [] });
            else next(err);
        });
    },
    getByDiscordId(req, res, next) {
        db.findByDiscordId(req.params.id)
        .then(commands => res.json({ message: "Getting Commands", data: commands }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Custom Commands Found", data: [] });
            else next(err);
        });
    },
    getByDiscordIdAndGuildId(req, res, next) {
        db.findByDiscordIdAndGuildId({ discord_id: req.params.discord_id, guild_id: req.params.guild_id })
        .then(commands => res.json({ message: "Getting Commands", data: commands }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) 
                res.json({ message: "No Custom Commands Found", data: [] });
            else next(err);
        });
    },
    save(req, res, next) {
        let data = { 
            input: req.body.input.split(" ").join(""), output: req.body.output, 
            guild_id: req.body.guild_id, created_by: req.body.created_by, 
            date: moment().format("DD MMM YYYY") 
        }
        db.save(data)
        .then(command => res.json({ message: "Saving Command", data: command }))
        .catch(err => next(err));
    },
    update(req, res, next) {
        db.update(req.body)
        .then(command => res.json({ message: "Updating Command", data: command }))
        .catch(err => next(err));
    },
    delete(req, res, next) {
        db.delete(req.params.id)
        .then(() => res.json({ message: "Command Deleted" }))
        .catch(err => next(err));
    }
};
