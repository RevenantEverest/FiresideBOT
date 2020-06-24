const Discord = require('discord.js');

const characterController = require('../../controllers/dbControllers/charactersController');
const statsController = require('../../controllers/dbControllers/characterStatsController');
const equipmentController = require('../../controllers/dbControllers/characterEquipmentController');

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    characterController.getByDiscordId(bot, message, "StartAdventure", message.author.id, () => {
        return message.channel.send("You already have a character")
    }, handleCharacterCreation);

    async function handleCharacterCreation() {
        let characterData = { discord_id: message.author.id, level: 1, exp: 0, hit_points: 10, max_hit_points: 10, gold: 100, level_up: false };
        let statsData = {
            discord_id: message.author.id,
            attack: 1,
            defense: 1,
            wood_cutting: 1,
            mining: 1,
            fishing: 1,
            herbalism: 1,
            skinning: 1,
            alchemy: 1,
            blacksmithing: 1,
            leather_working: 1,
            tailoring: 1,
            enchanting: 1,
            jewel_crafting: 1,
            inscription: 1,
            first_aid: 1,
            cooking: 1,
            fire_making: 1,
            survival: 1,
            charisma: 1,
            perception: 1,
            endurance: 1,
            vitality: 1,
            stealth: 1,
            strength: 1,
            dexterity: 1,
            luck: 0
        };
        let equipmentData = {
            discord_id: message.author.id,
            helmet: 0,
            neck: 0,
            back: 0,
            chest: 0,
            waist: 0,
            hands: 0,
            wrists: 0,
            legs: 0,
            feet: 0,
            ring1: 0,
            ring2: 0,
            trinket1: 0,
            trinket2: 0,
            main_hand: 0,
            off_hand: 0
        };

        characterController.save(bot, message, "StartAdventure", characterData, (character) => {
            statsController.save(bot, message, "StartAdventure", statsData, (stats) => {
                equipmentController.save(bot, message, "StartAdventure", equipmentData, (equipment) => {
                    handleCompleteEmbed(character, stats, equipment);
                });
            });
        });
    };

    async function handleCompleteEmbed(character, stats, equipment) {
        let embed = new Discord.MessageEmbed();

        embed
        .setColor(0x00ff00)
        .setAuthor(`${message.author.username}'s Character`, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setTitle("New Character Overview")
        .addField(`PROGRESS`, 
            `Health: ${character.hit_points}/${character.max_hit_points}\n` +
            `Level: ${character.level}\n` +
            `EXP: ${character.exp}`,
            true
        )
        .addField("CURRENCY", `<:Gold:649045142740926466> Gold: ${character.gold}\n <:Fireside:538307773008445440> Embers: 0`, true)
        .addField(`STATS`,
            `Attack: ${stats.attack}\n` +
            `Defense: ${stats.defense}\n` +
            `Survival: ${stats.survival}\n` +
            `Charisma: ${stats.charisma}\n` +
            `Perception: ${stats.perception}\n` +
            `Endurance: ${stats.endurance}\n` +
            `Vitality: ${stats.vitality}\n` +
            `Stealth: ${stats.stealth}\n` +
            `Strength: ${stats.strength}\n` +
            `Dexterity: ${stats.dexterity}\n`, +
            `Luck: ${stats.luck}`
        )

        message.channel.send(embed)
    };
};

module.exports.config = {
    name: 'startadventure',
    d_name: 'StartAdventure',
    aliases: ['sa', 'startad'],
    category: 'Acirhia',
    desc: `If a user doesn't have character, this command creates one. It is needed before using any other Acirhia commands without a profile`,
    example: 'startadventure'
};