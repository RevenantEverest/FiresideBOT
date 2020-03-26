const fortunesController = require('../../controllers/dbControllers/fortunesController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify a fortune to add");
    args.splice(0, 1);

    fortunesController.getByGuildId(bot, message, "CreateFortune", message.guild.id, handleUpdateFortunes, () => {
        let data = { guild_id: message.guild.id, fortunes: [args.join(" ")] };
        fortunesController.save(bot, message, "CreateFortune", data, () => {
            return message.channel.send(`Fortune **${args.join(" ")}** added!`);
        });
    });

    async function handleUpdateFortunes(fortunes) {
        fortunes.fortunes.push(args.join(" "));
        let data = { id: fortunes.id, guild_id: message.guild.id, fortunes: fortunes.fortunes };
        fortunesController.update(bot, message, "CreateFortune", data, () => {
            return message.channel.send(`Fortune **${args.join(" ")}** added!`);
        });
    };
};

module.exports.config = {
    name: 'createfortune',
    d_name: 'CreateFortune',
    aliases: ['cf'],
    params: { required: true, params: 'Fortune name' },
    category: 'Admin',
    desc: 'Creates a fortune to be used in the 8ball command',
    example: `createfortune Oh? You're approaching me?`
};