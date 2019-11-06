const db = require('../../models/customCommandsDB');
const config = require('../../config/config');
const utils = require('../utils/utils');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function checkForCommand(bot, message, commandName, commandOutput) {
    db.findByGuildIdAndInput({ guild_id: message.guild.id, input: commandName })
    .then(() => message.channel.send("Custom command name already exists"))
    .catch(err => {
        if(err instanceof QRE && err.code === qrec.noData) return saveCommand(bot, message, commandName, commandOutput);
        else errorHandler(bot, message, err, "Error Finding Command", "CreateCommand");
    })
};

async function saveCommand(bot, message, commandName, commandOutput) {
    let date = await utils.getDate();
    db.save({ guild_id: message.guild.id, created_by: message.author.id, input: commandName, output: commandOutput, date: date })
    .then(newCommand => message.channel.send(`New command **${newCommand.input.charAt(0).toUpperCase() + newCommand.input.slice(1)}** created by <@${newCommand.created_by}> with ID: **${newCommand.id}**`))
    .catch(err => errorHandler(bot, message, err, "Error Creating Command", "CreateCommand"))
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a command name and a command output. Names can only be 1 word and outputs can be up to 1024 characters.");
    if(!args[2]) return message.channel.send("Please Specify a command output. Outputs can be up to 1024 characters long.");
    if(config.commands.length < 1) return message.channel.send("Commands haven't been set since startup, please wait a few seconds before trying again");
    if(config.commands.map(el => el.name).includes(args[1].toLowerCase())) return message.channel.send("Commands may not have the same name default Fireside commands.");
    if([].concat.apply([], config.commands.map(el => el.aliases)).includes(args[1].toLowerCase())) 
        return message.channel.send("Commands may not have the same name default Fireside commands.");
    
    let commandName = args[1].toLowerCase();
    args.splice(0, 1);
    args.splice(0, 1);
    let commandOutput = args.join(" ");

    if(commandOutput.split("").length > 1024) return message.channel.send("Command outputs can only be 1024 characters long.");

    checkForCommand(bot, message, commandName, commandOutput);
};

module.exports.config = {
    name: 'createcommand',
    d_name: 'CreateCommand',
    aliases: ['addcom'],
    params: { required: true, params: 'Input (Command Name) and Output (Command Response)' },
    category: 'Admin',
    desc: 'Create a custom command',
    example: `createcommand MyCommand This is a new command`
};