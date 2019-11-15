const disabledCommandsController = require('../../controllers/dbControllers/disabledCommandsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a command you'd like to enable");
    let command = bot.commands.get(args[1].toLowerCase()) || bot.commands.get(bot.aliases.get(args[1].toLowerCase()));
    if(!command) return message.channel.send("Not a valid Command or Alias");

    disabledCommandsController.getByGuildId(bot, message, "EnableCommand", message.guild.id, enableCommand, () => {
        enableCommand([]);
    });

    async function enableCommand(disabledCommands) {
        let dCommandNames = disabledCommands.map(el => el.command);
        if(!dCommandNames.includes(command.config.name))
            return message.channel.send(`**${command.config.d_name}** is already enabled`);
        let data = disabledCommands[dCommandNames.indexOf(command.config.name)].id;
        disabledCommandsController.delete(bot, message, "EnableCommand", data, () => {
            return message.channel.send(`**${command.config.d_name}** is now enabled`);
        });
    };
};

module.exports.config = {
    name: 'enablecommand',
    d_name: 'EnableCommand',
    aliases: ['ec'],
    params: { required: true, params: 'Command Name or Alias' },
    category: 'Admin',
    desc: 'Enables a Command',
    example: 'enablecommand play'
}