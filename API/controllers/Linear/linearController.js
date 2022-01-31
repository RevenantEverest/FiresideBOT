const Discord = require('discord.js');
const { handleCreate, handleUpdate, handleRemove, handleRestore } = require('./IssueOperations');
const { dateUtils } = require('../../utils');
const services = {};

services.handleWebhook = (req, res, next) => {

    res.sendStatus(200);

    const linearIssue = req.body;
    const issueData = linearIssue.data;
    const embed = new Discord.MessageEmbed();

    const createdAt = dateUtils.formatDate(linearIssue.createdAt);

    embed
    .setFooter(`${createdAt.date} at ${createdAt.time} EST`, "https://i.imgur.com/hnL8LTj.png")
    .setThumbnail("https://i.imgur.com/hnL8LTj.png")

    switch(linearIssue.action) {
        case "create":
            return handleCreate(issueData, embed);
        case "update":
            if(linearIssue.updatedFrom.stateId)
                return handleUpdate(issueData, embed);
            else
                return;
        case "remove": 
            return handleRemove(issueData, embed);
        case "restore":
            return handleRestore(issueData, embed);
        default:
            return;
    };
};

module.exports = services;