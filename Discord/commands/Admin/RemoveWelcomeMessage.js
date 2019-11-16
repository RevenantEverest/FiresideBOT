const welcomeMessageController = require('../../controllers/dbControllers/welcomeMessageController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    welcomeMessageController.getByGuildId(bot, message, "RemoveWelcomeMessage", message.guild.id, deleteWelcomeMessage, () => {
        return message.channel.send("No Welcome Message Found")
    });

    async function deleteWelcomeMessage(welcomeMessage) {
        welcomeMessageController.delete(bot, message, "RemoveWelcomeMessage", welcomeMessage.id, () => {
            return message.channel.send("Welcome Message Removed");
        });
    };
};

module.exports.config = {
    name: 'removewelcomemessage',
    d_name: 'RemoveWelcomeMessage',
    aliases: ['rwm'],
    category: 'Admin',
    desc: `Remove the current Welcome Message (Also disables Welcome Message)`,
    example: 'removewelcomemessage'
};