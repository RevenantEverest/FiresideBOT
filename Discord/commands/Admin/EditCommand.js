const config = require('../../config/config');
const customCommandsController = require('../../controllers/dbControllers/customCommandsController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!args[1]) return message.channel.send("Please specify a command name");
    if(!args[2]) return message.channel.send("Please specify an updated name using the flag -n or an updated output");
    if(args.includes("-n") && !args[3]) return message.channel.send("Please specify an updated command name");

    customCommandsController.getByGuildId(bot, message, "EditCommand", message.guild.id, handleCommands, () => handleCommands([]));

    async function handleCommands(commands) {
        let commandQuery = args[1] === "-n" ? args[2].toLowerCase() : args[1].toLowerCase();
        if(args.includes("-n")) {
            commandQuery = args.join(" ").toLowerCase().split(" ");
            commandQuery.splice(args.indexOf("-n"), 1);
            let newName = commandQuery[2];
            commandQuery = commandQuery[1];
            if(commands.filter(el => el.input === newName).length > 0)
                return message.channel.send("Command Name Already Exists");
            if(config.commands.length < 1) return message.channel.send("Commands haven't been set since startup, please wait a few seconds before trying again");
            if(config.commands.map(el => el.name).includes(newName)) return message.channel.send("Commands may not have the same name default Fireside commands.");
            if([].concat.apply([], config.commands.map(el => el.aliases)).includes(newName)) 
                return message.channel.send("Commands may not have the same name default Fireside commands.");
        }
        let data = { guild_id: message.guild.id, input: commandQuery };
        customCommandsController.getByGuildIdAndInput(bot, message, "EditCommand", data, updateCommand, handleNoData);
    };

    async function updateCommand(command) {
        let commandOutput = command.output;
        let commandInput =  command.input;
        if(args.includes("-n")) {
            commandInput = args.join(" ").toLowerCase().split(" ");
            commandInput.splice(args.indexOf("-n"), 1);
            commandInput = commandInput[2];
        }
        else {
            args.splice(0, 1);
            args.splice(0, 1);
            commandOutput = args.join(" ");
        }
        let data = { guild_id: message.guild.id, id: command.id, input: commandInput, output: commandOutput };
        customCommandsController.update(bot, message, "EditCommand", data, (newCommand) => {
            return message.channel.send(
                `Custom Command **${command.input.charAt(0).toUpperCase() + command.input.slice(1)}** ` +
                `successfully updated by <@${message.author.id}>`
            );
        });
    };

    async function handleNoData() { return message.channel.send("No Command Found"); }
};

module.exports.config = {
    name: 'editcommand',
    d_name: 'EditCommand',
    aliases: ['editcom'],
    params: { required: true, params: 'Name of command to change, an updated name or an updated output' },
    flags: ['-n'],
    category: 'Admin',
    desc: 'Edit a custom command',
    example: `editcommand MyCommand This is my new command edit`
};