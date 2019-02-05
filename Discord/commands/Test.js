
module.exports.run = async (PREFIX, message, args, server, bot) => {
    let date = new Date();
    let options = {
        timezone: 'EST', 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        hour: 'numeric',
        minute: 'numeric'
    }
    message.channel.send(date.toLocaleString('en-US', options));
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: ['other', 'Other'],
    b_desc: '',
    desc: ''
}