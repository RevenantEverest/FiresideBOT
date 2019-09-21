const db = require('../../models/autoRoleDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function removeAutoRole(bot, message, id) {
    db.delete(id)
    .then(() => message.channel.send("AutoRole successfully removed"))
    .catch(err => errorHandler(bot, message, err, "DB Error", "AutoRole"));
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    db.findByGuildId(message.guild.id)
    .then(autoRole => removeAutoRole(bot, message, autoRole.id))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No Auto Role Available");
        else errorHandler(bot, message, err, "DB Error", "AutoRole");
    })
};

module.exports.config = {
    name: 'removeautorole',
    d_name: 'RemoveAutoRole',
    aliases: ['rar'],
    params: { required: true, params: '@Role Tag' },
    category: 'Admin',
    desc: 'Removes set AutoRole (Also disables AutoRole)',
    example: 'autorole @users'
};