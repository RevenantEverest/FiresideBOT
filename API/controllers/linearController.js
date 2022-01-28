const services = {};
const Discord = require('discord.js');
const bot = require('../Discord_Bot');
const linearServices = require('../services/linearServices');
const { dateUtils, linear } = require('../utils');

services.handleWebhook = async (req, res, next) => {

    const linearIssue = req.body;
    const issueData = linearIssue.data;
    const embed = new Discord.MessageEmbed();

    const createdAt = dateUtils.formatDate(linearIssue.createdAt);

    embed
    .setFooter(`${createdAt.date} at ${createdAt.time} EST`, "https://i.imgur.com/hnL8LTj.png")
    .setThumbnail("https://i.imgur.com/hnL8LTj.png")

    switch(linearIssue.action) {
        case "create":
            return handleIssueCreate();
        case "update":
            if(linearIssue.updatedFrom.stateId)
                return handleIssueUpdate();
            else
                return;
        case "remove": 
            return handleIssueRemove();
        case "restore":
            return handleIssueRestore();
        default:
            return;
    };

    async function handleIssueCreate() {

        const author = await linear.getLinearUserDiscord(bot, issueData.creatorId);

        embed
        .setColor(0x5E6AD2)
        .setAuthor(`${author.username} created an issue`, author.avatarURL({ dynamic: true }))
        .setTitle(`**${issueData.team.key}-${issueData.number}** ${issueData.title}`)
        .setDescription(issueData.description)
        .addField("Status", issueData.state.name, true)

        if(issueData.priority > 0)
            embed.addField("Priority", issueData.priorityLabel, true);
        
        if(issueData.project)
            embed.addField("Project", issueData.project.name, true);

        if(issueData.team)
            embed.addField("Team", issueData.team.name, true);

        if(issueData.labels)
            embed.addField("Labels", issueData.labels.map(label => label.name).join(", "));
        
        sendEmbed();
    };

    async function handleIssueUpdate() {
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

            sendEmbed();
        })
        .catch(err => {
            console.error(err)
        });
    };

    async function handleIssueRemove() {
        const title = `**${author.username}** deleted issue ${issueData.team.key}-${issueData.number} ${issueData.title}`;

        embed
        .setColor(0xFF0000)
        .setAuthor(`Issue Deleted`, author.avatarURL({ dynamic: true }))
        .setTitle(title)

        sendEmbed();
    };

    async function handleIssueRestore() {
        const title = `**${author.username}** restored issue ${issueData.team.key}-${issueData.number} ${issueData.title}`;

        embed
        .setColor(0x1BD31C)
        .setAuthor(`Issue Restored`, author.avatarURL({ dynamic: true }))
        .setTitle(title)

        sendEmbed();
    };

    async function sendEmbed() {
        const channelId = process.env.ENVIRONMENT === "DEV" ? "427883469092159492" : "896220035247394826";

        bot.channels.resolve(channelId).send(embed);
    };
};

module.exports = services;