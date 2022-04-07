const Discord = require('discord.js');
const characterController = require('../../controllers/dbControllers/charactersController');

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    characterController.getFullCharacter(bot, message, "MyCharacter", message.author.id, handleCharacterEmbed, () => {
        return message.channel.send("No character found. Use the **StartAdventure** command to create a character!");
    });

    async function handleCharacterEmbed(character) {
        let embed = new Discord.MessageEmbed();

        embed
        .setColor(0xcc33ff)
        .setAuthor(`${message.author.username}'s Character`, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setTitle("Character Overview")
        .addField(`PROGRESS`, 
            `Health: ${character.hit_points}/${character.max_hit_points}\n` +
            `Level: ${character.level}\n` +
            `EXP: ${character.exp}`,
            true
        )
        .addField("CURRENCY", `<:Gold:649045142740926466> Gold: ${character.gold}\n <:Fireside:538307773008445440> Embers: 0`, true)
        .addField(`STATS`,
            `Attack: ${character.attack}\n` +
            `Defense: ${character.defense}\n` +
            `Survival: ${character.survival}\n` +
            `Charisma: ${character.charisma}\n` +
            `Perception: ${character.perception}\n` +
            `Endurance: ${character.endurance}\n` +
            `Vitality: ${character.vitality}\n` +
            `Stealth: ${character.stealth}\n` +
            `Strength: ${character.strength}\n` +
            `Dexterity: ${character.dexterity}\n` +
            `Luck: ${character.luck}`,
        )
        

        message.channel.send(embed);
    };
};

module.exports.config = {
    name: 'mycharacter',
    d_name: 'MyCharacter',
    aliases: ['mc', 'vc'],
    category: 'Acirhia',
    desc: 'View Character Stats and Equipped Items',
    example: 'mycharacter'
};