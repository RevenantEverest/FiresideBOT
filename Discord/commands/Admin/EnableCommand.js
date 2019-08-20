const db = require('../../models/disabledCommandsDB');

const pgp = require('pg-promise')();
const QRE = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;

const errorHandler = require('../../controllers/errorHandler');

async function enableCommand(message, command, id) {
    db.delete(id)
    .then(() => message.channel.send(`**${command.d_name}** is now enabled`))
    .catch(err => errorHandler(message, err, "Error Removing Disabled Command", "EnableCommand"))
}

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a command you'd like to enable");
    let cmd = bot.commands.get(args[1].toLowerCase()) || bot.commands.get(bot.aliases.get(args[1].toLowerCase()));
    if(cmd) {
        db.findByGuildId(message.guild.id)
        .then(dCmd => {
            dCmd = dCmd.map(el => el.command);
            if(dCmd.includes(cmd.config.name))
                enableCommand(message, cmd, dCmd[dCmd.indexOf(cmd.config.name)].id)
            else return message.channel.send(`**${cmd.config.d_name}** is already enabled`)
        })
        .catch(err => {
            if(err instanceof QRE && err.code === qrec.noData)
                save(message, command.config);
            else errorHandler(message, err, "DB Error", "EnableCommand");
        })
    }
    else message.channel.send("Not a valid Command or Alias");
};

module.exports.config = {
    name: 'enablecommand',
    d_name: 'EnableCommand',
    aliases: [''],
    params: { required: true, params: 'Command Name or Alias' },
    category: 'Admin',
    desc: 'Enables a Command',
    example: 'enablecommand play'
}