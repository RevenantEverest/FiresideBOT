const fortunesController = require('../../controllers/dbControllers/fortunesController');
const fortuneParser = require('../../controllers/fortunesParser');
const { fortunes } = require("../../utils");

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Ask a question.");

    const defaultFortunes = fortunes.defaultFortunes;

    fortunesController.getByGuildId(bot, message, "8ball", message.guild.id, handleFortunes, () => {
        message.channel.send(defaultFortunes[Math.floor(Math.random() * defaultFortunes.length)]);
    });

    async function handleFortunes(customFortunes) {
        let allFortunes = [].concat.apply(defaultFortunes, customFortunes.fortunes);
        let chosenFortune = allFortunes[Math.floor(Math.random() * allFortunes.length)];
        return fortuneParser(message, chosenFortune);
    }
};

module.exports.config = {
    name: '8ball',
    d_name: '8Ball',
    aliases: ['eightball', 'fortune'],
    params: { required: true, params: 'Question' },
    category: 'Fun',
    desc: 'Returns a Yes or No style response',
    example: '8ball Am I a good developer?'
};