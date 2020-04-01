const newMemberMessagesController = require('../../controllers/dbControllers/newMemberMesssagesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a valid message index"); // Update this
    else if(!Number.isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid Index");

    newMemberMessagesController.getByGuildId(bot, message, this.config.d_name, message.guild.id, handleNewMemberMessage, () => {
        return message.channel.send("No New Member Messages");
    });

    async function handleNewMemberMessage(newMemberMessages) {
        let index = parseInt(args[1], 10) - 1;
        if(index < 0 || index >= newMemberMessages.messages.length) 
            return message.channel.send('Invalid Index');
        let removedMessage = newMemberMessages.messages[index];

        newMemberMessages.messages.splice(index, 1);

        updateNewMemberMessages(newMemberMessages, removedMessage);
    };

    async function updateNewMemberMessages(newMemberMessages, removedMessage) {
        newMemberMessagesController.update(bot, message, "RemoveNewMemberMessage", newMemberMessages, () => {
            return message.channel.send(`New Member Message **${removedMessage}** successfully deleted`);
        });
    };
};

module.exports.config = {
    name: 'removenewmembermessage',
    d_name: 'RemoveNewMemberMessage',
    aliases: ['rnmm'],
    params: { required: true, params: 'Message Index' },
    category: 'Admin',
    desc: 'Removes a new member message',
    example: "removenewmembermessage 4"
};