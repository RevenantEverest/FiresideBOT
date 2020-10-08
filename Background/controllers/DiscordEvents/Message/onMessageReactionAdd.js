const roleReactionsController = require('../../roleReactionsController');
const errorHandler = require('../../errorHandler');

module.exports = async (bot, reaction, user) => {
    if(user.bot) return;
    
    let guild = null;
    if(reaction.partial) 
        reaction.fetch()
        .then(fullReaction => {
            reaction = fullReaction;
            getRoleReaction();
        })
        .catch(err => {
            errorHandler({ controller: "onMessageReactionAdd Controller", message: "Error Fetching Partial Reaction", error: err })
        });
    else 
        getRoleReaction();
    
    async function getRoleReaction() {
        guild = reaction.message.channel.guild;
        roleReactionsController.getByGuildIdAndMessageId({ guild_id: guild.id, message_id: reaction.message.id }, handleRoleReaction);
    };

    async function handleRoleReaction(roleReaction) {
        if(roleReaction.emoji_id !== reaction._emoji.id) return;

        let guildMember = guild.members.resolve(user.id);

        guildMember.roles.add(roleReaction.role_id)
        .catch(err => errorHandler({ controller: "onMessageReactionAdd Controller", message: "Error Granting Role", error: err }));
    };
};