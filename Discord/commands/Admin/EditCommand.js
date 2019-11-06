const db = require('../../models/customCommandsDB');
const config = require('../../config/config');
const utils = require('../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function findCommandByID(bot, message, args, id) {
    db.findById(id)
    .then(command => {
        if(command.guild_id !== message.guild.id) return message.channel.send("Command Not Found");
        args.splice(0, 1);
        args.splice(0, 1);
        editCommand(bot, message, args, command, args.join(" "));
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return message.channel.send
        else errorHandler(bot, message, err, "Error Finding Command by ID", "DeleteCommand");
    });
};

async function findCommandByName(bot, message, args, input) {
    db.findByGuildIdAndInput({ guild_id: message.guild.id, input: input })
    .then(command => {
        args.splice(0, 1);
        args.splice(0, 1);
        editCommand(bot, message, args, command, args.join(" "));
    })
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return message.channel.send("Command Not Found");
        else errorHandler(bot, message, err, "Error Finding Command by Input", "DeleteCommand");
    });
};

async function editCommand(bot, message, args, command, commandOutput) {
    db.update({ guild_id: message.guild.id, id: command.id, input: command.input, output: commandOutput })
    .then(uCommand => message.channel.send(`Custom Command **${uCommand.input.charAt(0).toUpperCase() + uCommand.input.slice(1)}** successfully updated by <@${message.author.id}>`))
    .catch(err => errorHandler(bot, message, err, "Error Updating Command", "EditCommand"))
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a command name or command ID");
    if(Number.isInteger(parseInt(args[1], 10))) return findCommandByID(bot, message, args, parseInt(args[1], 10));
    else return findCommandByName(bot, message, args, args[1].toLowerCase());
};

module.exports.config = {
    name: 'editcommand',
    d_name: 'EditCommand',
    aliases: ['editcom'],
    params: { required: true, params: 'Command Name or ID and Updated Output' },
    category: 'Admin',
    desc: 'Edit a custom command',
    example: `editcommand MyCommand This is my new command edit`
};