import { WebhookPayload } from '@top-gg/sdk';
import Discord from 'discord.js';
import bot from '../../../discordBot.js';

import VoteRecord from '../../../entities/VoteRecord.js';
import VoteLog from '../../../entities/VoteLog.js';

import { dates, promises, entities, logs, colors, discord } from '../../../utils/index.js';
import { LOG_CHANNELS } from '../../../constants/index.js';

async function handleVote(vote: WebhookPayload): Promise<void> {
    const voteRecordConditional = {
        discord_id: vote.user
    };
    const [voteRecord, voteRecordErr] = await entities.findOrSave<VoteRecord>(VoteRecord, voteRecordConditional, {
        discord_id: vote.user,
        amount: 0
    });

    if(voteRecordErr) {
        return logs.error({ err: voteRecordErr, message: "Error Finding/Saving Vote Record" });
    }

    if(!voteRecord) {
        return logs.error({ message: "No Vote Record" });
    }

    const [voteRecordUpdate, voteRecordUpdateErr] = await entities.update<VoteRecord>(VoteRecord, {
        ...voteRecord,
        amount: voteRecord.amount + 1
    });

    if(voteRecordUpdateErr) {
        return logs.error({ err: voteRecordUpdateErr, message: "Error Updating Vote Record" });
    }

    if(!voteRecordUpdate) {
        return logs.error({ message: "No Vote Record Update" });
    }

    const [voteLog, voteLogErr] = await entities.insert<VoteLog>(VoteLog, {
        discord_id: vote.user
    });

    if(voteLogErr) {
        return logs.error({ err: voteLogErr, message: "Error Inserting Vote Log" });
    }

    if(!voteLog) {
        return logs.error({ message: "No Vote Log" });
    }

    const [discordUser, discordUserErr] = await promises.handle<Discord.User>(bot.users.fetch(vote.user));

    if(discordUserErr) {
        return logs.error({ err: discordUserErr, message: "Error Finding Discord User" });
    }

    const voteEmbed = new Discord.MessageEmbed({
        color: colors.banana,
        fields: [
            { 
                name: "**Vote Received**", 
                value: "Thank you for your vote!" 
            }
        ]
    });

    const { date, time } = await dates.getTimestampAndFormat();
    const logEmbed = new Discord.MessageEmbed({
        color: colors.random(),
        fields: [
            {
                name: "Vote Received",
                value: `ID: ${vote.user}`
            }
        ],
        footer: { text: `${date} at ${time}` } 
    });

    if(discordUser) {
        discordUser.send({ embeds: [voteEmbed] });
    }

    const [logChannel, logChannelErr] = await discord.getTextChannel(bot, LOG_CHANNELS.VOTES);

    if(logChannelErr) {
        return logs.error({ err: logChannelErr, message: "Error Getting Log Channel" });
    }

    if(!logChannel) {
        return logs.error({ message: "No Log Channel" });
    }

    logChannel.send({ embeds: [logEmbed] });
};

export default handleVote;