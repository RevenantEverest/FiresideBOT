const bot = require('../../../Discord_Bot');
const sendEmbed = require('./sendEmbed');
const { linear } = require('../../../utils');

module.exports = async (issueData, embed) => {
    const author = await linear.getLinearUserDiscord(bot);
    const title = `${issueData.team.key}-${issueData.number} ${issueData.title}`;

    embed
    .setColor(0xFF0000)
    .setAuthor(`Issue Deleted`, author.avatarURL({ dynamic: true }))
    .setTitle(title)

    sendEmbed(embed);
};