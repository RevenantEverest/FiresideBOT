module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(!args[1]) return message.channel.send('You rolled a ' + (Math.floor(Math.random() * 6)));
    if(isNaN(parseInt(args[1], 10)) && args[1] != " ") return message.channel.send("Please specify a number.");
    if(!isNaN(parseInt(args[1], 10))) return message.channel.send('You rolled a ' + (Math.floor(Math.random() * args[1])));
};

module.exports.config = {
    name: 'roll',
    d_name: 'Roll',
    aliases: ['dice'],
    params: { required: false, optional: true, params: 'Number' },
    category: ['fun', 'Fun'],
    desc: 'Rolls any number sided dice (Default is 6)'
};