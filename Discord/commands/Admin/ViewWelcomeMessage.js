const welcomeMessageController = require('../../controllers/dbControllers/welcomeMessageController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    welcomeMessageController.getByGuildId(bot, message, "ViewWelcomeMessage", message.guild.id, handleWelcomeMessage, () => {
        return message.channel.send('No Welcome Message Found');
    });

    async function handleWelcomeMessage(welcomeMessage) {
        message.author.send(welcomeMessage.message);
    };
};

module.exports.config = {
    name: 'viewwelcomemessage',
    d_name: 'ViewWelcomeMessage',
    aliases: ['vwm'],
    category: 'Admin',
    desc: `Get sent an example of your server's welcome message in a DM`,
    example: 'viewwelcomemessage'
};