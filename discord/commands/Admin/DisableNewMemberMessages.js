const newMemberMessagesController = require('../../controllers/dbControllers/newMemberMesssagesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    newMemberMessagesController.getByGuildId(bot, message, this.config.d_name, message.guild.id, updateNewMemberMessages, () => {
        return message.channel.send("New Member Messages already disabled");
    });

    async function updateNewMemberMessages(newMemberMessages) {
        if(!newMemberMessages.enabled) return message.channel.send("New Member Messages already disabled");
        
        newMemberMessages.enabled = newMemberMessages.enabled = false;

        newMemberMessagesController.update(bot, message, "DisableNewMemberMessages", newMemberMessages, () => {
            return message.channel.send(`New member Messages **disabled**`)
        });
    };
};

module.exports.config = {
    name: 'disablenewmembermessages',
    d_name: 'DisableNewMemberMessages',
    aliases: ['dnmm'],
    category: 'Admin',
    desc: 'Disables New Member Messages System',
    example: `disablenewmembermessages`
};