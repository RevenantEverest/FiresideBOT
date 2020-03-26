const fortunesController = require('../../controllers/dbControllers/fortunesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a valid fortune index"); // Update this
    else if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid Index");

    fortunesController.getByGuildId(bot, message, "DeleteFortune", message.guild.id, handleFortune, () => {
        return message.channel.send("No custom fortunes");
    });

    async function handleFortune(fortunes) {
        let index = parseInt(args[1], 10) - 1;
        if(index < 0 || index >= fortunes.fortunes.length) return message.channel.send("Invalid Index __");
        let removedFortune = fortunes.fortunes[index];

        fortunes.fortunes.splice(index, 1);

        if(fortunes.fortunes.length < 1) return deleteFortunes(fortunes, removedFortune);
        else return updateFortunes(fortunes, removedFortune);
    };

    async function updateFortunes(fortunes, removedFortune) {
        let data = { id: fortunes.id, guild_id: message.guild.id, fortunes: fortunes.fortunes };
        fortunesController.update(bot, message, "DeleteFortune", data, () => {
            return message.channel.send(`Fortune **${removedFortune}** sucessfully deleted!`);
        });
    };

    async function deleteFortunes(fortunes, removedFortune) {
        fortunesController.delete(bot, message, "DeleteFortune", fortunes.id, () => {
            return message.channel.send(`Fortune **${removedFortune}** sucessfully deleted!`);
        });
    };
};

module.exports.config = {
    name: 'deletefortune',
    d_name: 'DeleteFortune',
    aliases: ['df'],
    params: { required: true, params: 'Fortune Index' },
    category: 'Admin',
    desc: 'Deletes a custom fortune used in the 8ball command',
    example: 'deletefortune 4'
};