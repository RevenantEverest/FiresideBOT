const newMemberMessagesController = require('../../controllers/dbControllers/newMemberMesssagesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please tag a Text Channel you'd like new member messages to be posted in");

    let channel_id = null;
    if(/<#?(\d+)>/.exec(args.join(" "))) channel_id = /<#?(\d+)>/.exec(args.join(" "))[1];
    else return message.channel.send("Please tag a Text Channel you'd like new member messages to be posted in");

    newMemberMessagesController.getByGuildId(bot, message, this.config.d_name, message.guild.id, updateNewMemberMessages, () => {
        let data = { guild_id: message.guild.id, messages: [], channel_id: channel_id, enabled: true };
        newMemberMessagesController.save(bot, message, this.config.d_name, data, () => {
            return message.channel.send(`New Member Messages **enabled** and will be posted in <#${channel_id}>`);
        });
    });

    async function updateNewMemberMessages(newMemberMessages) {
        if(newMemberMessages.enabled) return message.channel.send("New Member Messages already enabled");
        
        newMemberMessages.enabled = newMemberMessages.enabled = true;
        newMemberMessages.channel_id = channel_id;

        newMemberMessagesController.update(bot, message, "EnableNewMemberMessages", newMemberMessages, () => {
            return message.channel.send(`New member Messages **enabled** and will be posted in <#${channel_id}>`)
        });
    };
};

module.exports.config = {
    name: 'enablenewmembermessages',
    d_name: 'EnableNewMemberMessages',
    aliases: ['enmm'],
    params: { required: true, params: 'Text Channel Tag' },
    category: 'Admin',
    desc: 'Enables New Member Messages System',
    example: `enablenewmembermessages #welcome`
};