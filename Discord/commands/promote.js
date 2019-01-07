module.exports.run = async (PREFIX, message, args, server, bot) => {

};

module.exports.config = {
    name: 'promote',
    d_name: 'Promote',
    aliases: [],
    params: { required: true, optional: false, params: 'ID' },
    category: ['music', 'Music'],
    desc: 'Promotes a song to next in queue'
};