const Discord = require('discord.js');
const triviaServices = require('../../services/openTriviaServices');
const errorHandler = require('../../controllers/errorHandler');
const utils = require('../utils/utils');

const answerEmotes = ['1️⃣', '2️⃣','3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
const numberEmotes = ['\u0031', '\u0032', '\u0033', '\u0034', '\u0035', '\u0036', '\u0037', '\u0038', '\u0039', '\u1F51F'];

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    let amount = 1;
    let questions = null;
    if(args[1] && !Number.isInteger(parseInt(args[1], 10))) 
        return message.channel.send("Please valid specify a trivia length");
    else if(args[1] && Number.isInteger(parseInt(args[1], 10))) amount = parseInt(args[1], 10);

    triviaServices.basicTrivia({ amount: amount })
    .then(questions => handleQuestions(questions.data.results))
    .catch(err => errorHandler(bot, message, err, "OpenTrivia API Error", "Trivia"));

    async function handleQuestions(triviaQuestions) {
        questions = triviaQuestions;
        let currentQuestion = questions[0];
        let embed = new Discord.RichEmbed();

        currentQuestion.question = await utils.replaceHTMLEntitiy(currentQuestion.question);

        embed
        .setColor(0xff0fab)
        .setTitle(`${currentQuestion.question}`)
        .setDescription(
            `${currentQuestion.category} - ` + 
            `**${currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}**`
        )

        let answers = [await utils.replaceHTMLEntitiy(currentQuestion.correct_answer)];
        currentQuestion.incorrect_answers.forEach(async el => {
            el = await utils.replaceHTMLEntitiy(el);
            answers.push(el);
        });

        if(currentQuestion.type === "multiple") answers = await utils.shuffle(answers);

        reactionCollector(questions, currentQuestion, embed, answers);
    };

    async function reactionCollector(questions, currentQuestion, embed, answers) {
        let totalAnswers = 0;
        let answerInfo = [];

        let temp = "";
        answers.forEach((el, idx) => temp += `${answerEmotes[idx]}: ${el} **0%**\n`)
        embed.addField("Answers:", temp);
        message.channel.send(embed)
        .then(async msg => {

            for(let i = 0; i < answers.length; i++) { 
                await msg.react(`${numberEmotes[i]}\u20E3`);
                answerInfo.push({ id: (i + 1), answers: 0 });
            };

            await msg.react("▶️");

            const r_collector = new Discord.ReactionCollector(msg, r => r.users.array(), { time: (1 * 60000) });
            r_collector.on('collect', reaction => {
                if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
                if(reaction.emoji.name === "▶️") return r_collector.stop();
                let editEmbed = new Discord.RichEmbed();
    
                for(let i = 0; i < answerInfo.length; i++) {
                    if(answerInfo[i].id === parseInt(reaction.emoji.name, 10)) {
    
                        totalAnswers++;
                        answerInfo[i].answers++;
    
                        editEmbed
                        .setColor(0xff0fab)
                        .setTitle(currentQuestion.question)
                        .setDescription(
                            `${currentQuestion.category} - ` +
                            `**${currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}**`
                        )
                        
                        temp = '';
                        answers.forEach((a, idx) => temp += `${answerEmotes[idx]}: ${a} **${Math.round((answerInfo[idx].answers / totalAnswers) * 100)}%**\n`);
                        editEmbed.addField('Answers:', temp)
                        reaction.message.edit(editEmbed);
                    }
                }
            });
            r_collector.on('end', () => {
                let endEmbed = new Discord.RichEmbed();
                endEmbed
                .setTitle(currentQuestion.question)
                .setDescription(
                    `${currentQuestion.category} - ` +
                    `**${currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}**`
                )
                .addField("Total Answers:", totalAnswers, true)
                .setColor(0x00ff99)
                
                let results = '';
                if(totalAnswers === 0)
                    answers.forEach((a, i) => results += `${a === currentQuestion.correct_answer ? "🟢" : "🔴"} ${a} **0%** \n`);
                else 
                    answers.forEach((a, i) => {
                        results += `${a === currentQuestion.correct_answer ? "🟢" : "🔴"} ${a} **${Math.round((answerInfo[i].answers / totalAnswers) * 100)}%**\n`
                    });
    
                endEmbed.addField('Results:', results);

                let permissions =  new Discord.Permissions(message.channel.permissionsFor(bot.user).bitfield);
                if(permissions.has("MANAGE_MESSAGES")) msg.clearReactions();

                questions.shift();

                msg.edit(endEmbed).then(() => {
                    if(questions.length > 0) return handleQuestions(questions);
                });
            });
        })
        .catch(err => console.error(err));
    };
};

module.exports.config = {
    name: 'trivia',
    d_name: 'Trivia',
    aliases: [],
    params: { required: false, params: 'Number' },
    flags: ["-easy", "-medium", "-hard"],
    category: 'Fun',
    desc: 'Starts a trivia game',
    example: 'trivia 10 -medium '
};