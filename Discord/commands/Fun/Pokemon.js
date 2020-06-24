const Discord = require('discord.js');
const pokemonServices = require('../../services/pokemonServices');

const errorHandler = require('../../controllers/errorHandler');

async function getPokemon(message, args, id) {
    let pokemonPromises = [pokemonServices.getPokemon(id)];
    let pokemonEmbed = new Discord.MessageEmbed();
    // Flag Check
    if(args[1] === '-i' || args[2] === '-i') pokemonPromises.push(pokemonServices.getPokemonSpecies(id));

    Promise.all(pokemonPromises).then(pokemon => {
        let name = pokemon[0].data.name.charAt(0).toUpperCase() + pokemon[0].data.name.replace(pokemon[0].data.name.charAt(0), "");
        let sprite = pokemon[0].data.sprites.front_default;
        let types = '';
        for(let i = 0; i < pokemon[0].data.types.length; i++) {
            types += pokemon[0].data.types[i].type.name.charAt(0).toUpperCase() + pokemon[0].data.types[i].type.name.replace(pokemon[0].data.types[i].type.name.charAt(0), "") + " ";
        }
        pokemonEmbed
        .setColor(0xffff00)
        .setThumbnail(sprite)
        .setTitle(`# ${pokemon[0].data.id}`)
        .addField("**Name :**", name, true)
        if(pokemon[1]) {
            let arr = [];
            for(let i = 0; i < pokemon[1].data.flavor_text_entries.length; i++) {
                if(pokemon[1].data.flavor_text_entries[i].language.name === 'en' && arr.length < 1) {
                  arr.push(pokemon[1].data.flavor_text_entries[i].flavor_text)
                }
            }
            pokemonEmbed
              .addField("**Description :**", arr)
              .addBlankField()
              .addField("**Type :**", types, true)
              .addField("**Weight :**", `${pokemon[0].data.weight} kg`, true)
              .addField("**Height :**", `${pokemon[0].data.height} m`, true)
        }
        message.channel.send(pokemonEmbed);
    })
    .catch(err => {
        if(err.response.status === 404)
            message.channel.send("No Pokemon found by that name or ID");
        else errorHandler(bot, message, err, "API Error", "Pokemon");
    });
};

module.exports.run = async (PREFIX, message, args, server, bot, options, userstate) => {
    if(!args[1] || args[1] === "-i" && !args[2]) return getPokemon(message, args, (Math.floor(Math.random() * 802)));
    if(args[1]) {
        let id = args[1].toLowerCase();
        if(args[1] === '-i') id = args[2].toLowerCase();
        return getPokemon(message, args, id);
    }
};

module.exports.config = {
    name: 'pokemon',
    d_name: 'Pokemon',
    aliases: [],
    params: { required: false, params: 'ID or Name' },
    flags: ['-i'],
    category: 'Fun',
    desc: 'Displays a random or specific Pokemon',
    example: 'pokemon Manaphy -i'
};