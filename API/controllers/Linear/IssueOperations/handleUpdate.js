const bot = require('../../../Discord_Bot');
const linearServices = require('../../../services/linearServices');
const sendEmbed = require('./sendEmbed');
const { linear } = require('../../../utils');

module.exports = async (issueData, embed) => {
    linearServices.getIssueActor(issueData.id)
    .then(async results => {
        
        const mostRecentIssueHistory = results.data.data.issue.history.nodes.filter(el => el.toState)[0];
        const issueActor = mostRecentIssueHistory.actor;
        const fromState = mostRecentIssueHistory.fromState;
        const toState = mostRecentIssueHistory.toState;

        if(!fromState && !toState) return;

        const author = await linear.getLinearUserDiscord(bot, issueActor ? issueActor.id : null);
        const title = `**${author.username}** changed status to **${toState.name}** for ${issueData.team.key}-${issueData.number} ${issueData.title}`;

        embed
        .setColor(toState.color)
        .setAuthor(`Issue Status Changed`, author.avatarURL({ dynamic: true }))
        .setTitle(title)

        sendEmbed(embed);
    })
    .catch(err => {
        console.error(err)
    });
};