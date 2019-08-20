const db = require('../../models/disabledCommandsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function save(bot, message, command) {
    db.save({ guild_id: message.guild.id, command: command.name })
    .then(() => message.channel.send(`**${command.d_name}** is now disabled`))
    .catch(err => errorHandler(bot, message, err, "Error Saving Disabled Command", "DisableCommand"))
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a command you'd like to disable");
    let command = bot.commands.get(args[1].toLowerCase()) || bot.commands.get(bot.aliases.get(args[1].toLowerCase()));
    if(command) {
        db.findByGuildId(message.guild.id)
        .then(dCommands => dCommands.map(el => el.command).includes(command.config.name) ? message.channel.send("**${command.d_name}** is already disabled") : save(bot, message, command.config))
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                save(bot, message, command.config);
            else errorHandler(bot, message, err, "DB Error", "DisableCommand");
        })
    }
    else message.channel.send("Not a valid Command or Alias");
};

module.exports.config = {
    name: 'disablecommand',
    d_name: 'DisableCommand',
    aliases: [],
    params: { required: true, params: 'Command Name or Alias' },
    category: 'Admin',
    desc: 'Disables a Command',
    example: 'disablecommand play'
}