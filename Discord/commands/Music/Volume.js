function isFloat(n) {
    return n === +n && n !== (n|0);
};

function isInteger(n) {
    return n === +n && n === (n|0)
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    if(!message.member.voiceChannel) return message.channel.send('Please join a voice channel');
    if(!args[1]) return message.channel.send(`Current Volume: ${server.queue.options.volume}`);
    if(!isInteger(parseInt(args[1], 10))) return message.channel.send("Invalid integer value.");
    if(parseInt(args[1], 10) > 100 || parseInt(args[1], 10) <= 0) return message.channel.send("Please select a volume between 1 and 100.");
    server.queue.options.volume = args[1];
    if(server.dispatcher) {
      if(isInteger(parseInt(args[1], 10) / 100)) {
        server.dispatcher.setVolume(parseInt(args[1], 10) / 100);
      }else if(isFloat(parseFloat(args[1], 10) / 100)) {
        server.dispatcher.setVolume(parseFloat(args[1], 10) / 100);
      }
    }
    if(args[0] === '') return;
    message.channel.send(`Volume set to: ${args[1]}`);
};

module.exports.config = {
    name: 'volume',
    d_name: 'Volume',
    aliases: ['vol'],
    params: { required: false, params: 'Number' },
    category: 'Music',
    desc: 'Displays current volume or sets volume',
    example: 'volume 20'
};