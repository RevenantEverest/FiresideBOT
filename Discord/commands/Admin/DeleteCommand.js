const db = require('../../models/customCommandsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function findCommandByID(bot, message, args, id) {
    db.findById(id)
    .then(command => {
        if(command.guild_id !== message.guild.id) return message.channel.send("Command Not Found");
        deleteCommand(bot, message, args, command);
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return message.channel.send("Command Not Found");
        else errorHandler(bot, message, err, "Error Finding Command by ID", "DeleteCommand");
    });
};

async function findCommandByName(bot, message, args, input) {
    db.findByGuildIdAndInput({ guild_id: message.guild.id, input: input })
    .then(command => deleteCommand(bot, message, args, command))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return message.channel.send("Command Not Found");
        else errorHandler(bot, message, err, "Error Finding Command by Input", "DeleteCommand");
    });
};

async function deleteCommand(bot, message, args, command) {
    db.delete(command.id)
    .then(() => message.channel.send(`Custom Command **${command.input.charAt(0).toUpperCase() + command.input.slice(1)}** successfully deleted by <@${message.author.id}>`))
    .catch(err => errorHandler(bot, message, err, "Error Deleting Command", "DeleteCommand"))
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a command name or command ID");
    if(Number.isInteger(parseInt(args[1], 10))) return findCommandByID(bot, message, args, parseInt(args[1], 10));
    else return findCommandByName(bot, message, args, args[1].toLowerCase());
};

module.exports.config = {
    name: 'deletecommand',
    d_name: 'DeleteCommand',
    aliases: ['delcom'],
    params: { required: true, params: 'Command ID or CommandName' },
    category: 'Admin',
    desc: 'Delete a custom command',
    example: `deletecommand MyCommand`
};