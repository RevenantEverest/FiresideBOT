const db = require('../models/discordRanksDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

async function updateRankNumbers(rank, res, next) {
    db.findByGuildId(rank.guild_id)
    .then(ranks => {
        let rankData = [];
        let promises = [];
        
        ranks.forEach((el, idx) => rankData.push({ id: el.id, guild_id: el.guild_id, rank_name: el.rank_name, rank_number: (idx + 1) }));
        rankData.forEach(el => promises.push(db.update(el)));

        Promise.all(promises)
        .then(() => res.json({ message: "Rank Deleted" }))
        .catch(err => next(err));
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            res.json({ message: "Rank Deleted" });
        else next(err);
    });
};

async function saveRank(rank, res, next) {
    db.save(rank)
    .then(rank => res.json({ message: "Rank Saved", data: rank }))
    .catch(err => next(err));
};

module.exports = {
    index(req, res, next) {
        db.findAll()
        .then(ranks => res.json({ message: "Getting All Ranks", data: ranks }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Ranks Found", data: [{}] });
            else next(err);
        })
    },
    getOne(req, res, next) {
        db.findById(req.params.id)
        .then(rank => res.json({ message: "Getting Rank", data: rank }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Ranks Found", data: {} });
            else next(err);
        })
    },
    getByGuildId(req, res, next) {
        db.findByGuildId(req.params.id)
        .then(ranks => res.json({ message: "Getting Ranks", data: ranks }))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData) res.json({ message: "No Ranks Found", data: [{}] });
            else next(err);
        })
    },
    create(req, res, next) {
        db.findByGuildId(req.body.guild_id)
        .then(ranks => saveRank({ guild_id: req.body.guild_id, rank_name: req.body.rank_name, rank_number: (ranks.length + 1) }, res, next))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                saveRank({ guild_id: req.body.guild_id, rank_name: req.body.rank_name, rank_number: 1 }, res, next)
            else next(err);
        });
    },
    update(req, res, next) {
        db.update(req.body)
        .then(rank => res.json({ message: "Rank Updated", data: rank }))
        .catch(err => next(err));
    },
    delete(req, res, next) {
        db.delete(req.params.id)
        .then(rank => updateRankNumbers(rank, res, next))
        .catch(err => next(err));
    }
};