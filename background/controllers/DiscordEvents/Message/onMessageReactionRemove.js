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
        .catch(err => errorHandler({ controller: "onMessageReactionRemove Controller", message: "Error Fetching Partial Reaction", error: err }));
    else
        getRoleReaction();

    async function getRoleReaction() {
        guild = reaction.message.channel.guild;
        roleReactionsController.getByGuildIdAndMessageId({ guild_id: guild.id, message_id: reaction.message.id }, handleRoleReaction);
    };

    async function handleRoleReaction(roleReactions) {
        const reactionEmoji = reaction._emoji;
        const isDefaultEmoji = Boolean(!reactionEmoji.id);
        const matchingRoleReactions = roleReactions.filter((roleReaction) => {
            const emoji_id = roleReaction.emoji_id;

            if(isDefaultEmoji && emoji_id === reactionEmoji.name || !isDefaultEmoji && emoji_id === reactionEmoji.id)
                return roleReaction;
        }).filter(Boolean);

        if(matchingRoleReactions.length <= 0) 
            return;

        try {
            const guildMember = await guild.members.fetch(user.id);
            matchingRoleReactions.forEach(async (roleReaction) => {
                await guildMember.roles.remove(roleReaction.role_id);
            });
        }
        catch(err) {
            return errorHandler({ controller: "onMessageReactionRemove Controller", message: "Error Removing Role", error: err });
        }
    };
};