const welcomeMessageController = require('../../controllers/dbControllers/welcomeMessageController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a desired Welcome Message");
    args.splice(0, 1);
    let messageLength = args.join(" ").split("").length;
    if(messageLength > 1024) return message.channel.send(`Exceeded character limit by **${message.length - 1024}** characters.`);

    welcomeMessageController.getByGuildId(bot, message, "EditWelcomeMessage", message.guild.id, updateWelcomeMessage, () => {
        let data = { guild_id: message.guild.id, message: args.join(" ") };
        welcomeMessageController.save(bot, message, "EditWelcomeMessage", data, () => {
            return message.channel.send("Welcome Message Updated");
        });
    });

    async function updateWelcomeMessage(welcomeMessage) {
        let data = { id: welcomeMessage.id, guild_id: message.guild.id, message: args.join(" ") };
        welcomeMessageController.update(bot, message, "EditWelcomeMessage", data, () => {
            return message.channel.send("Welcome Message Updated");
        });
    };
};

module.exports.config = {
    name: 'editwelcomemessage',
    d_name: 'EditWelcomeMessage',
    aliases: ['ewm'],
    params: {required: true, params: 'Message (1024 Character Limit)'},
    category: 'Admin',
    desc: `Edit a welcome message that get's sent to anyone who joins the server (Also enables Welcome Message)`,
    example: 'editwelcomemessage Thank you for joining my server!'
};