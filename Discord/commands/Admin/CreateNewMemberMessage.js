const newMemberMessagesController = require('../../controllers/dbControllers/newMemberMesssagesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a message to send to new server members.");
    args.splice(0, 1);

    newMemberMessagesController.getByGuildId(bot, message, this.config.d_name, message.guild.id, handleNewMemberMessage, () => {
        let data = { guild_id: message.guild.id, messages: [args.join(" ")], channel_id: "none", enabled: false  };
        newMemberMessagesController.save(bot, message, this.config.d_name, data, () => {
            return message.channel.send("New member message created!");
        });
    });

    async function handleNewMemberMessage(newMemberMessages) {
        newMemberMessages.messages.push(args.join(" "));
        newMemberMessagesController.update(bot, message, "CreateNewMemberMessage", newMemberMessages, () => {
            return message.channel.send("New member message created!");
        });
    }
};

module.exports.config = {
    name: 'createnewmembermessage',
    d_name: 'CreateNewMemberMessage',
    aliases: ['cnmm'],
    params: { required: true, params: 'Message' },
    category: 'Admin',
    desc: 'Creates a member message to be pulled from when a new member joins',
    example: "createnewmembermessage Welcome ${user} you\'re our ${membercount}"
};