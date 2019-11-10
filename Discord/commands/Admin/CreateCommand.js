const config = require('../../config/config');
const customCommandsController = require('../../controllers/dbControllers/customCommandsController');
const utils = require('../utils/utils');

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

    customCommandsController.getByGuildIdAndInput(bot, message, "CreateCommand", { guild_id: message.guild.id, input: commandName }, () => {
        return message.channel.send("Custom Command name already exists");
    }, saveCommand);

    async function saveCommand() {
        let data = { guild_id: message.guild.id, created_by: message.author.id, input: commandName, output: commandOutput, date: await utils.getDate() };
        customCommandsController.save(bot, message, "CreateCommand", data, (newCommand) => {
            return message.channel.send(
                `New command **${newCommand.input.charAt(0).toUpperCase() + newCommand.input.slice(1)}** ` + 
                `created by <@${newCommand.created_by}> with ID: **${newCommand.id}**`
            );
        });
    }
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