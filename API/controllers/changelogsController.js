const Discord = require('discord.js');
const bot = require('../Discord_Bot');
const db = require('../models/changelogsDB');

const moment = require('moment');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(changelogs => res.json({ message: "Getting Changelogs", data: changelogs }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Changelogs Found", data: [] });
            else next(err);
        });
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(changelog => res.json({ message: "Getting Changelog", data: changelog }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Changelogs Found", data: [] });
            else next(err);
        });
    },
    save(req, res, next) {
        db.save({ content: req.body.content, version: req.body.version, type: req.body.type, release_date: moment().format("DD MMM YYYY") })
        .then(changelog => {
            let embed = new Discord.RichEmbed;
            let description = "";
            let contentCharArr = req.body.content.split(" ");
            contentCharArr.splice(1, 1);
            contentCharArr.splice(1, 1);
            contentCharArr = contentCharArr.join(" ").split("");
            contentCharArr.forEach((el, idx) => idx <= 300 ? (el === "#" ? description += '' : description += el) : description += '');
            embed
            .setColor(0xff6600)
            .setTitle(`v${req.body.version} Changelog`)
            .setURL(`https://firesidebot.com/changelogs/v${req.body.version}`)
            .setThumbnail("https://cdn.discordapp.com/avatars/441338104545017878/b69fdee69b32d3b3d001a13c1bca9256.png?size=2048")
            .setDescription(description + "...")

            if(!req.body.send_embed) return res.json({ message: "Saving Changelog", data: changelog });

            bot.channels.resolve(process.env.ENVIRONMENT === "DEV" ? "624360349700980745" : "584830720992608286").send(
                `<@&${process.env.ENVIRONMENT === "DEV" ? "653928780217319424" : "653928224069255169"}> ` +
                `${req.body.type.toLowerCase() === "release" ? "Update" : "Patch"} v${req.body.version} is ready for release\n\n` +
                (req.body.flavor_text ? req.body.flavor_text + "\n\n" : "") +
                `You can view the full changelog at https://firesidebot.com/changelogs/v${req.body.version}`,
                embed
            );
            res.json({ message: "Saving Changelog", data: changelog });
        })
        .catch(err => next(err));
    },
    update(req, res, next) {
        db.update(req.body)
        .then(changelog => res.json({ message: "Updating Changelogs", data: changelog }))
        .catch(err => next(err));
    },
    delete(req, res, next) {
        db.delete(req.params.id)
        .then(() => res.json({ message: "Deleted Changelogs" }))
        .catch(err => next(err));
    }
};