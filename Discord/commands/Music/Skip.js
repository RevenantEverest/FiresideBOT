module.exports.run = async (PREFIX, message, args, server, bot) => {
    if(server.dispatcher)
        server.dispatcher.end();
};

module.exports.config = {
    name: 'skip',
    d_name: 'Skip',
    aliases: [],
    params: { required: false, optional: false, params: '' },
    category: ['music', 'Music'],
    desc: 'Skips to next song in queue'
}