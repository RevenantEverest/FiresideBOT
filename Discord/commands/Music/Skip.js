const Discord = require('discord.js');
const utils = require('../utils/utils');

async function handleVote(bot, message, server, memberData) {
    if(memberData.count <= 1) server.dispatcher.end();
    let embed = new Discord.RichEmbed();
    let whoVoted = [];
    let voteData = { needed: Math.floor(memberData.count / 2), upvotes: 0 };

    embed
    .addField("Vote To Skip", `${message.author.username} wants to skip\n ${voteData.upvotes} / ${voteData.needed}`)

    message.channel.send(embed).then(async msg => {
        await msg.react("✅");
        await msg.react("❌");

        const r_collector = new Discord.ReactionCollector(msg, r => r.users.array(), { time: 60000 });
        r_collector.on('collect', reaction => {
            if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;

            reaction.users.array().forEach(el => {
                if(!whoVoted.includes(el.id) && memberData.members.includes(el.id)) {
                    let updateEmbed = new Discord.RichEmbed();
                    whoVoted.push(el.id);
                    
                    if(reaction.emoji.name === "✅") {
                        voteData.upvotes++;
                        if(voteData.upvotes >= voteData.needed) {
                            server.dispatcher.end();
                            r_collector.stop();
                        }
                        else {
                            embed
                            .addField("Vote To Skip",`${message.author.username} wants to skip\n ${voteData.upvotes} / ${voteData.needed}`);
                        
                            reaction.message.edit(updateEmbed)
                        }
                    }
                }
            });

        });
        r_collector.on('end', () => {
            msg.delete();
        });
    })
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(server.queue.options.voteToSkip && server.dispatcher) {
        let memberData = {
            count: message.guild.voiceConnection.channel.members.array().filter(el => el.user.bot === false).length,
            members: message.guild.voiceConnection.channel.members.array().filter(el => el.user.bot === false).map(el => el.user.id)
        };
        handleVote(bot, message, server, memberData);
    }
    else if(server.dispatcher)
        server.dispatcher.end();
};

module.exports.config = {
    name: 'skip',
    d_name: 'Skip',
    aliases: [],
    category: 'Music',
    desc: 'Skips to next song in queue',
    example: 'skip'
};