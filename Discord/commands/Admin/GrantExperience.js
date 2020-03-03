const Discord = require('discord.js');
const rankRecordsController = require('../../controllers/dbControllers/rankRecordsController');
const logsController = require('../../controllers/dbControllers/guildLogSettingsController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    // if(!args[1]) return message.channel.send("Please specify an amount and tag a user.");

    let constA = (complexity / 1.15);
    let constB = (complexity / -0.25);
    let constC = (complexity * (complexity + 3));
    let Level = Math.max( Math.floor( constA * Math.log(exp + constC ) + constB ), 1);

    async function getBase(x, y) {
        return Math.max(Math.floor(Math.log(y) / Math.log(x)));
    }

};

module.exports.config = {
    name: 'grantexperience',
    d_name: 'GrantExperience',
    aliases: ['grantexp', 'gexp'],
    params: { required: true, params: 'User Tag / Amount' },
    flags: ["-r"],
    category: 'Admin',
    desc: 'Gives EXP to a member',
    example: 'grantexperience @RevenantEverest 100 -r Good vibes'
};