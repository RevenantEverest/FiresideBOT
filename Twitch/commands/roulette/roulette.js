function RNG(num) {
  return Math.floor(Math.random() * num);
}

module.exports = {
  roulette(channel, message, args, bot) {
    if(RNG(6) === 1) bot.say(channel, "You died.");
    else bot.say(channel, "You survived!")
  }
}
