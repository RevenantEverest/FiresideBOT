const disabledCommandsController = require('../../controllers/dbControllers/disabledCommandsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a command name or alias you'd like to disable");
    let command = bot.commands.get(args[1].toLowerCase()) || bot.commands.get(bot.aliases.get(args[1].toLowerCase()));
    if(!command) return message.channel.send("Invalid Command or Alias");

    disabledCommandsController.getByGuildId(bot, message, "DisableCommand", message.guild.id, disableCommand, () => {
        disableCommand([]);
    });

    async function disableCommand(disabledCommands) {
        disabledCommands = disabledCommands.map(el => el.command);
        if(disabledCommands.includes(command.config.name)) return message.channel.send(`**${command.d_name}** is already disabled`);
        let data = { guild_id: message.guild.id, command: command.config.name };
        disabledCommandsController.save(bot, message, "DisableCommand", data, () => {
            return message.channel.send(`**${command.config.d_name}** is now disabled`);
        });
    };
};

module.exports.config = {
    name: 'disablecommand',
    d_name: 'DisableCommand',
    aliases: ['disabledcommands', 'dc'],
    params: { required: true, params: 'Command Name or Alias' },
    category: 'Admin',
    desc: 'Disables a Command',
    example: 'disablecommand play'
};