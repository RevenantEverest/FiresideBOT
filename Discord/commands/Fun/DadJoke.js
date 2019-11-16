const Discord = require('discord.js');
const apiServices = require('../../services/apiServices');

const errorHandler = require('../../controllers/errorHandler');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    apiServices.getDadJoke()
    .then(joke => {
        if(args.includes("-i")) {
            let embed = new Discord.RichEmbed();
            embed
            .setColor(0xff99cc)
            .setImage(`https://icanhazdadjoke.com/j/${joke.data.id}.png`);

            message.channel.send(embed);
        }
        else message.channel.send(joke.data.joke);
    })
    .catch(err => errorHandler(bot, message, err, "API Error", "Dadjoke"));
};

module.exports.config = {
    name: 'dadjoke',
    d_name: 'DadJoke',
    aliases: [],
    params: { required: false, params: 'Flag' },
    flags: ['-i'],
    category: 'Fun',
    desc: 'Returns a random Dad Joke either as text or an image',
    example: 'dadjoke'
};