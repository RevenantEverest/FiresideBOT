const Discord = require('discord.js');

const character = {};
const races = [
    {name: 'Elf', gender: 'Male', image: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2Fab%2F38%2F2c%2Fab382c68a4f4a0e312e31d9e7de917bb--wood-elf-pathfinder-rpg.jpg&f=1'},
    {name: 'Elf', gender: 'Female', image: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F8e%2F2d%2F4f%2F8e2d4fd0fb1d4dd239037442ecc3e34b.jpg&f=1'},
    {name: 'Human', gender: 'Male', image: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F8b%2F29%2F5e%2F8b295e03bbcd54e6dbe00bf8b881737b.png&f=1'},
    {name: 'Human', gender: 'Female', image: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2F50%2F68%2Fa9%2F5068a93972385513893955f71a3a00e3.jpg&f=1'}
];
const classes = [
    {name: 'Warrior', image: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fzam.zamimg.com%2Fimages%2Fc%2Ff%2Fcf8bfbed7b54de4882248840e6d33c25.png&f=1'},
    {name: 'Mage', image: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2F3xhumed%2Fmega-games-pack-28%2F256%2FRunes-of-Magic-Mage-1-icon.png&f=1'},
    {name: 'Archer', image: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.emberwindgame.com%2Fwp-content%2Fuploads%2Fclass-icon-archer.png&f=1'}
];

async function handleEmbed(message, content, index) {
    let embed = new Discord.RichEmbed();
    embed
    .setTitle(message)
    .addBlankField()
    .addField(content[index].name, (content[index].gender ? content[index].gender : '_'))
    .setImage(content[index].image)
    .setColor(0xff3300)
    .setFooter(`Page ${index + 1}/${content.length}`)

    return embed;
};

async function chooseRaceAndGender(bot, message) {
    let index = 0;
    let embed = await handleEmbed("Please Choose A Race and Gender", races, index);

    message.channel.send(embed).then(async msg => {
        let raceChosen = false;
        await msg.react("⏪");
        await msg.react("✅");
        await msg.react("⏹");
        await msg.react("⏩");
      
        const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });
        r_collector.on('collect', async (reaction, user) => {
            if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
            let temp = false;
            if(reaction.emoji.name === "⏹") r_collector.stop();
            if(reaction.emoji.name === "✅") {
                character.race = races[index].name;
                character.gender = races[index].gender;
                character.image = races[index].image;
                raceChosen = true;
                temp = true;
                r_collector.stop();
            }
    
            if(reaction.emoji.name === "⏪") index === 0 ? index = (races.length - 1) : index--;
            else if(reaction.emoji.name === "⏩") index === (races.length - 1) ? index = 0 : index++;
    
            embed = await handleEmbed("Please Choose A Race and Gender", races, index);
            
            if(temp) return;
            reaction.message.edit(embed);
            reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
        });
        r_collector.on("end", () => {
            if(raceChosen) chooseClass(bot, message);
            msg.delete();
        });
    })
};

async function chooseClass(bot, message) {
    let index = 0;
    let embed = await handleEmbed("Please Choose A Class", classes, index);

    message.channel.send(embed).then(async msg => {
        let classChosen = false;
        await msg.react("⏪");
        await msg.react("✅");
        await msg.react("⏹");
        await msg.react("⏩");
      
        const r_collector = new Discord.ReactionCollector(msg, r => r.users.array()[r.users.array().length - 1].id === message.author.id, { time: 60000 });
        r_collector.on('collect', async (reaction, user) => {
            if(reaction.users.array()[reaction.users.array().length - 1].id === bot.user.id) return;
            let temp = false;
            if(reaction.emoji.name === "⏹") r_collector.stop();
            if(reaction.emoji.name === "✅") {
                character.class = classes[index].name
                temp = true;
                classChosen = true;
                r_collector.stop();
            }
    
            if(reaction.emoji.name === "⏪") index === 0 ? index = (classes.length - 1) : index--;
            else if(reaction.emoji.name === "⏩") index === (classes.length - 1) ? index = 0 : index++;
    
            embed = await handleEmbed("Please Choose A Class", classes, index);
            if(temp) return;
            reaction.message.edit(embed);
            reaction.remove(reaction.users.array()[reaction.users.array().length - 1].id);
        });
        r_collector.on("end", () => {
            if(classChosen) chooseName(bot, message);
            msg.delete();
        });
    })
};

async function chooseName(bot, message) {
    let confirm = false;
    let CharacterName = null;
    message.channel.send("Please choose a name for your character: ").then(msg => {
        const m_collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
        m_collector.on('collect', async (m, user) => {
            if(confirm && m.content.toLowerCase() === "y") {
                character.name = CharacterName;
                m_collector.stop();
            }
            else if(confirm && m.content.toLowerCase() === "n") {
                confirm = false;
                CharacterName = null;
                m.channel.send("Please choose a name for your character:");
            }
            else {
                CharacterName = m.content;
                confirm = true;
                m.channel.send(`Do you want your character to be named: **${CharacterName}**? (y/n)`);
            }
        });
        m_collector.on('end', () => {
            if(CharacterName) displayCharacter(bot, message);
            msg.delete();
        })
    });
};

async function displayCharacter(bot, message) {
    let embed = new Discord.RichEmbed();
    embed
    .setColor(0xff3300)
    .setImage(character.image)
    .addField(character.name, `${character.gender} ${character.race} ${character.class}`);

    message.channel.send('Character Successfully Created!', embed)
};

module.exports.run = async (PREFIX, message, args, server, bot, options) => {
    // Grab Name
    // Create Race & Gender Choice Embed
    // Create Class Choice Embed
    // Limit Character Creation to 3
    chooseRaceAndGender(bot, message);
};

module.exports.config = {
    name: 'createcharacter',
    d_name: 'CreateCharacter',
    aliases: ['createchar'],
    params: { required: true, params: 'Character Name' },
    category: 'Acirhia',
    desc: 'Creates a new Acirhia Character',
    example: 'createcharacter King Arthur'
};