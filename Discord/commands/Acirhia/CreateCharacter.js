module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    // Grab Name
    // Create Race & Gender Choice Embed
    // Create Class Choice Embed
    // Limit Character Creation to 3
};

module.exports.config = {
    name: 'createcharacter',
    d_name: 'CreateCharacter',
    aliases: ['cc'],
    params: { required: true, params: 'Character Name' },
    category: 'Acirhia',
    desc: 'Creates a new Acirhia Character',
    example: 'createcharacter King Arthur'
};