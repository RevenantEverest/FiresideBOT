module.exports.run = async (PREFIX, message, args, server, bot) => {
    let GuildsArr = bot.guilds.array();
    let userCount = 0;
    // console.log(GuildsArr[0])
    for(let i = 0; i < GuildsArr.length; i++) {
        userCount += GuildsArr[i].memberCount;
    }
    message.channel.send(userCount);
};

module.exports.config = {
    name: 'test',
    aliases: [],
    category: ['other', 'Other'],
    b_desc: '',
    desc: ''
}