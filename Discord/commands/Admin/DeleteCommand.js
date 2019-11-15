const customCommandsController = require('../../controllers/dbControllers/customCommandsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a command name or command ID");
    if(Number.isInteger(parseInt(args[1], 10)))
        return customCommandsController.getOne(bot, message, "DeleteCommand", parseInt(args[1], 10), deleteCommand, handleNoData);
    else {
        let data = { guild_id: message.guild.id, input: args[1] };
        return customCommandsController.getByGuildIdAndInput(bot, message, "DeleteCommand", data, deleteCommand, handleNoData);
    }

    async function deleteCommand(command) {
        if(command.guild_id !== message.guild.id) return message.channel.send("Command Not Found");
        customCommandsController.delete(bot, message, "DeleteCommand", command.id, () => {
            return message.channel.send(
                `Custom Command **${command.input.charAt(0).toUpperCase() + command.input.slice(1)}** `+ 
                `successfully deleted by <@${message.author.id}>`
            );
        });
    }
    async function handleNoData() { return message.channel.send("Command Not Found") }
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