const pokemonServices = require('../services/pokemonServices');
const config = require('../../../config/config');
const Discord = config.Discord;

const snakeImages = [
  'http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/3t/t5/p03tt5gr.jpg',
  'https://animals.sandiegozoo.org/sites/default/files/2016-10/animals_hero_snakes.jpg',
  'http://www.bilkulonline.com/wp-content/uploads/2018/08/snakes-in-yard.jpg',
  'https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/custom-touts/2015/03/green-snake-care-smc-flickr-cc-by-2-teaser.jpg?itok=fkPGrlcw',
  'https://www.unilad.co.uk/wp-content/uploads/2016/01/snake-featured-2.jpg'
];

module.exports = {
  getPokemon(message, args, server) {
    let RNG = Math.floor(Math.random() * 400);
    pokemonServices.getPokemon(RNG)
      .then(pokemon => {
        let name = pokemon.data.name;
        let sprite = new Discord.Attachment(pokemon.data.sprites.front_default);

        message.channel.send(sprite);
      })
      .catch(err => console.log(err));
  },
  getSnakes(message, args, server) {
    let snake = new Discord.Attachment(snakeImages[Math.floor(Math.random() * snakeImages.length)]);
    message.channel.send(snake);
  }
}
