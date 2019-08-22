const db = require('../../models/autoRoleDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function displayAutoRole(bot, message) {
    db.findByGuildId(message.guild.id)
    .then(autoRole => message.channel.send(`Current Auto Role is <@&${autoRole.role_id}>`))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            message.channel.send("No Auto Role Available");
        else errorHandler(bot, message, err, "DB Error", "AutoRole");
    })
};

async function save(bot, message, role_id) {
    db.save({ guild_id: message.guild.id, role_id: role_id })
    .then(autoRole => message.channel.send(`<@&${autoRole.role_id}> will now be given to new server members`))
    .catch(err => errorHandler(bot, message, err, "Error Saving AutoRole", "AutoRole"));
};

async function update(bot, message, role_id, id) {
    db.update({ id: id, guild_id: message.guild.id, role_id: role_id })
    .then(autoRole => message.channel.send(`Auto Role updated to now allow <@&${autoRole.role_id}> to be given to new server members`))
    .catch(err => errorHandler(bot, message, err, "Error Updating AutoRole", "AutoRole"));
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return displayAutoRole(bot, message);
    
    let role_id = null;
    if(/<@&?(\d+)>/.exec(args.join(" "))) role_id = /<@&?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Invalid Role ID. Please tag a role you'd like new members to recieve");

    db.findByGuildId(message.guild.id)
    .then(autoRole => update(bot, message, role_id, autoRole.id))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData)
            save(bot, message, role_id);
        else errorHandler(bot, message, err, "DB Error", "AutoRole");
    })
};

module.exports.config = {
    name: 'autorole',
    d_name: 'AutoRole',
    aliases: ['ar'],
    params: { required: true, params: '@Role Tag' },
    category: 'Admin',
    desc: 'Assign a role to give new server members when they join',
    example: 'autorole @users'
};