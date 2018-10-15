const config = require('../../../config/config');
const RustPasta = [
  `You think I haven't already farmed 11,250,023 sulfur
  to craft 500,001 Incendiary 5.56 Rifle ammunition?
  Me and my L96 Rifle are going to spend the next
  18 days 12 hours 26 minutes and 41 seconds tearing you down`,

  `You think your armored wall will save you? You're fucking WRONG.
  I'll grab 8000 waterpipe shotguns,
  400,000 12 Gauge Incendiary Shells
  and spend the next
  722 hours 13 minutes and 14 seconds
  putting you in your goddamn place.
  You fucked with the wrong naked, pal.`,

  `Fuck you for killing me,
  I'm going to grab 1,667 slugs 34 waterpipe shotguns
  and spend 3 hours and 30 seconds blowing my way
  through your dirty poverty stone wall`,

  `I swear I will break through your stone wall with my 7143 rocks in
  9 hours 53 minutes and 23 seconds`
];

function RNG(num) {
  return Math.floor(Math.random() * num);
}

module.exports = {
  randomPasta(message, args, server) {
    return message.channel.send(RustPasta[RNG(RustPasta.length)], { tts: true });
  }
}
