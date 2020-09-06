module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1]) return message.channel.send("Please specify some choices to choose from");

    args.splice(0, 1);
    let choices = args.join(" ").split(",");

    message.channel.send(`I choose...**${choices[Math.floor(Math.random() * choices.length)].trim()}**`);
};

module.exports.config = {
    name: 'choose',
    d_name: 'Choose',
    aliases: [],
    category: 'Fun',
    desc: 'Takes a list of choices separated by commas and returns a random choice',
    example: 'choose'
};