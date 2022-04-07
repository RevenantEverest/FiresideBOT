const voteRecordsController = require('../../controllers/dbControllers/voteRecordsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    voteRecordsController.getByDiscordId(bot, message, "Vote", message.author.id, displayVotes, () => displayVotes({ amount: 0 }));
    
    async function displayVotes(record) {
        message.channel.send(
            `You have **${record.amount}** votes in stock.\n` +
            `https://discordbots.org/bot/441338104545017878/vote`
        );
    };
};

module.exports.config = {
    name: 'vote',
    d_name: 'Vote',
    aliases: ['votes'],
    category: 'Other',
    desc: 'Displays link to Vote for Fireside on DBL, and how many votes you have stored',
    example: 'vote'
};