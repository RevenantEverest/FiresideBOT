const pokemonServices = require('../services/pokemonServices');
const config = require('../../../config/config');
const Discord = config.Discord;

module.exports = {
  getPokemon(message, args, server) {
    if(!args[1] || args[1] === "-i" && !args[2]) return this.getRandomPokemon(message, args, server);
    if(args[1]) return this.getSpecificPokemon(message, args, server);
  },
  getRandomPokemon(message, args, server) {
    let RNG = Math.floor(Math.random() * 802);
    let pokemonEmbed = new config.Discord.RichEmbed();

    pokemonServices.getPokemon(RNG)
      .then(pokemon => {
        let name = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.replace(pokemon.data.name.charAt(0), "");
        // let sprite = new Discord.Attachment(pokemon.data.sprites.front_default);
        let sprite = pokemon.data.sprites.front_default;
        let types = '';
        for(let i = 0; i < pokemon.data.types.length; i++) {
          types += pokemon.data.types[i].type.name.charAt(0).toUpperCase() + pokemon.data.types[i].type.name.replace(pokemon.data.types[i].type.name.charAt(0), "") + " ";
        }
        pokemonEmbed
        .setColor(0xffff00)
        .setThumbnail(sprite)
        .setTitle(`# ${pokemon.data.id}`)
        .addField("**Name :**", name, true)

        if(args[1] === "-i") {
          pokemonServices.getPokemonSpecies(RNG)
            .then(species => {
              let arr = [];
              for(let i = 0; i < species.data.flavor_text_entries.length; i++) {
                if(species.data.flavor_text_entries[i].language.name === 'en' && arr.length < 1) {
                  arr.push(species.data.flavor_text_entries[i].flavor_text)
                }
              }
              pokemonEmbed
              .addField("**Description :**", arr)
              .addBlankField()
              .addField("**Type :**", types, true)
              .addField("**Weight :**", `${pokemon.data.weight} kg`, true)
              .addField("**Height :**", `${pokemon.data.height} m`, true)
              if(species.data.evolves_from_species !== null) {
                let evolvesFrom = species.data.evolves_from_species.name.charAt(0).toUpperCase() + species.data.evolves_from_species.name.replace(species.data.evolves_from_species.name.charAt(0), "")
                // .addField("Evolves From:", evolvesFrom)
              }

              message.channel.send(pokemonEmbed);
            })
            .catch(err => console.log(err));
        }else {
          message.channel.send(pokemonEmbed);
        }
      })
      .catch(err => console.log(err));
  },
  getSpecificPokemon(message, args, server) {
    let search = args[1].toLowerCase();
    if(args[1] === "-i") search = args[2].toLowerCase();
    let pokemonEmbed = new config.Discord.RichEmbed();

    pokemonServices.getPokemon(search)
      .then(pokemon => {
        let name = pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.replace(pokemon.data.name.charAt(0), "");
        // let sprite = new Discord.Attachment(pokemon.data.sprites.front_default);
        let sprite = pokemon.data.sprites.front_default;
        let types = '';
        for(let i = 0; i < pokemon.data.types.length; i++) {
          types += pokemon.data.types[i].type.name.charAt(0).toUpperCase() + pokemon.data.types[i].type.name.replace(pokemon.data.types[i].type.name.charAt(0), "") + " ";
        }
        pokemonEmbed
        .setColor(0xffff00)
        .setThumbnail(sprite)
        .setTitle(`# ${pokemon.data.id}`)
        .addField("**Name :**", name, true)

        if(args[1] === "-i" || args[2] === "-i") {
          pokemonServices.getPokemonSpecies(search)
            .then(species => {
              let arr = [];
              for(let i = 0; i < species.data.flavor_text_entries.length; i++) {
                if(species.data.flavor_text_entries[i].language.name === 'en' && arr.length < 1) {
                  arr.push(species.data.flavor_text_entries[i].flavor_text)
                }
              }
              pokemonEmbed
              .addField("**Description :**", arr)
              .addBlankField()
              .addField("**Type :**", types, true)
              .addField("**Weight :**", `${pokemon.data.weight} kg`, true)
              .addField("**Height :**", `${pokemon.data.height} m`, true)
              if(species.data.evolves_from_species !== null) {
                let evolvesFrom = species.data.evolves_from_species.name.charAt(0).toUpperCase() + species.data.evolves_from_species.name.replace(species.data.evolves_from_species.name.charAt(0), "")
                // .addField("Evolves From:", evolvesFrom)
              }

              message.channel.send(pokemonEmbed);
            })
            .catch(err => console.log(err));
        }else {
          message.channel.send(pokemonEmbed);
        }
      })
      .catch(err => {
        console.log(err);
        if(err.response.status === 404) {
          message.channel.send("No Pokemon found by that name or ID")
        }
      });
  }
}
