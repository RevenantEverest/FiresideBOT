module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!args[1]) return message.channel.send('You rolled a ' + (Math.floor(Math.random() * 20)));
    if(isNaN(parseInt(args[1], 10)) && args[1] != " ") return message.channel.send("Please specify a number.");
    if(!isNaN(parseInt(args[1], 10))) return message.channel.send('You rolled a ' + (Math.floor(Math.random() * args[1])));
};

module.exports.config = {
    name: 'roll',
    aliases: [],
    category: ['fun', 'Fun'],
    desc: ''
};