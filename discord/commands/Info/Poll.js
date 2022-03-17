const Discord = require('discord.js');
const answerEmotes = ['1️⃣', '2️⃣','3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
const numberEmotes = ['\u0031', '\u0032', '\u0033', '\u0034', '\u0035', '\u0036', '\u0037', '\u0038', '\u0039', '\u1F51F'];

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1] || !args.includes('-q') || !args.includes('-q') && !args.includes('-a')) 
        return message.channel.send('Please specify a question and at least one answer. \n\n`Example: ?poll -q How is everyone? -a Good -a Alright`');
    if(args.includes('-q') && !args.includes('-a')) return message.channel.send('Please specify at least one question using the `-a` flag');

    let embed = new Discord.MessageEmbed();
    let re = /(?<=\s)(-[a-z0-9]+)([^\-]*)?/gi;
    var poll = { question: "", answers: [], options: { time: 300000 } };
    var m = re.exec(args.join(" "));

    function strip(string) { return string.replace(/^\s+|\s+$/g, '') };

    while(m != null) {
        if(m[1] === "-q") {
            if(!m[2]) return message.channel.send("Invalid Poll Format");
            poll.question = strip(m[2]);
        }
        else if(m[1] === "-a") {
            if(!m[2]) return message.channel.send("Invalid Poll Format");
            poll.answers.push(strip(m[2]));
        }
        else if(m[1] === "-t") {
            if(!Number.isInteger(parseInt(strip(m[2]), 10))) return message.channel.send('Please enter a numeric value');
            poll.options.time = parseInt(strip(m[2]), 10) * 60000;
        }
        m = re.exec(message);
    }

    if(poll.answers.length > 5) return message.channel.send("Poll answers limited to 5");

    embed
    .setAuthor(`${message.author.username} started a poll`, message.author.avatarURL({ dynamic: true }))
    .setTitle(`${poll.question}`)
    .setColor(0x00ff00)
    .setFooter(`Poll started in ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))

    let firstAnswers = '';
    poll.answers.forEach((a, i) => firstAnswers += `${answerEmotes[i]}: **0%** ${a}\n`);
    embed.addField(`Answers:`, firstAnswers)

    message.channel.send(embed).then(async (msg) => {
        let totalVotes = 0;
        let voteInfo = [];
        let usersVoted = [];

        for(let i = 0; i < poll.answers.length; i++) { 
            await msg.react(`${numberEmotes[i]}\u20E3`);
            voteInfo.push({ voteId: (i + 1), votes: 0 });
        };

        const r_collector = new Discord.ReactionCollector(msg, r => r.users.cache.array(), { time: poll.options.time });

        r_collector.on('collect', (reaction, user) => {
            if(reaction.users.cache.array()[reaction.users.cache.array().length - 1].id === bot.user.id) return;
            if(usersVoted.includes(user.id)) return;
            let editEmbed = new Discord.MessageEmbed();
            usersVoted.push(user.id);

            /*

                Store who voted and what they voted for : (Its Stored in the r_collector.users property)
                If user changes vote update accordingly
                > Remove previous reaction
                > Lower previous reaction vote

            */

            for(let i = 0; i < voteInfo.length; i++) {
                if(voteInfo[i].voteId === parseInt(reaction.emoji.name, 10)) {

                    totalVotes++;
                    voteInfo[i].votes++;

                    editEmbed
                    .setAuthor(`${message.author.username} started a poll`, message.author.avatarURL({ dynamic: true }))
                    .setTitle(`${poll.question}`)
                    .setColor(0x00ff00)
                    .setFooter(`Poll started in ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                    
                    let answers = '';
                    poll.answers.forEach((a, idx) => answers += `${answerEmotes[idx]}: **${Math.round((voteInfo[idx].votes / totalVotes) * 100)}%** ${a}\n`);
                    editEmbed.addField('Answers:', answers)
                    reaction.message.edit(editEmbed);
                }
            }
        });
        r_collector.on('end', () => {
            let pollEndEmbed = new Discord.MessageEmbed();
            pollEndEmbed
            .setTitle('**Poll Has Ended**')
            .addField("Question:", poll.question, true)
            .addField("Asked By:", message.author.username, true)
            .addField("Total Votes:", totalVotes, true)
            .setColor(0x00ff99)
            .setFooter(`Poll started in ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            
            let results = '';
            if(totalVotes === 0)
                poll.answers.forEach((a, i) => results += `${answerEmotes[i]}: **0%** ${a}  \n`);
            else 
                poll.answers.forEach((a, i) => results += `${answerEmotes[i]}: **${Math.round((voteInfo[i].votes / totalVotes) * 100)}%** ${a}  \n`);

            pollEndEmbed.addField('Results:', results);

            msg.edit(pollEndEmbed);
            msg.reactions.removeAll();
        });
    })
    .catch(err => console.error(err));

};

module.exports.config = {
    name: 'poll',
    d_name: 'Poll',
    aliases: [],
    params: { required: true, params: '' },
    flags: ['-q', '-a', '-t'],
    category: 'Info',
    desc: 'Creates a new Poll',
    example: `poll -q How is everyone enjoying FiresideBOT? -a It's amazing -a It's okay -a Developer is bad :eyes: -t 60`
};