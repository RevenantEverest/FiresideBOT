const bot = require('../../../Discord_Bot');
const sendEmbed = require('./sendEmbed');
const { linear } = require('../../../utils');

module.exports = async (issueData, embed) => {
    const author = await linear.getLinearUserDiscord(bot, issueData.creatorId);

    embed
    .setColor(0x5E6AD2)
    .setAuthor(`${author.username} created an issue`, author.avatarURL({ dynamic: true }))
    .setTitle(`**${issueData.team.key}-${issueData.number}** ${issueData.title}`)
    .setDescription(issueData.description ? issueData.description : "")
    .addField("Status", issueData.state.name, true)

    if(issueData.priority > 0)
        embed.addField("Priority", issueData.priorityLabel, true);
    
    if(issueData.project)
        embed.addField("Project", issueData.project.name, true);

    if(issueData.team)
        embed.addField("Team", issueData.team.name, true);

    if(issueData.labels)
        embed.addField("Labels", issueData.labels.map(label => label.name).join(", "));
    
    sendEmbed(embed);
};