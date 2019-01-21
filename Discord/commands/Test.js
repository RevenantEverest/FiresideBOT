const apiServices = require('../services/apiServices');

module.exports.run = async (PREFIX, message, args, server, bot) => {
    args.splice(0, 1);
    apiServices.getSongInfo({track: args.join(" ")})
        .then(results => {
            console.log(args.join(" "))
            console.log(results.data.results.trackmatches.track)
        })
        .catch(err => console.error(err));
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: ['other', 'Other'],
    b_desc: '',
    desc: ''
}