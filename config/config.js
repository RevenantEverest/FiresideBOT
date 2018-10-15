module.exports = {
  Discord: require('discord.js'),
  TMI: require('tmi.js'),
  servers: {},
  Discord_Key: process.env.DISCORD_KEY,
  Twitch_Key: process.env.TWITCH_KEY,
  Google_Key: process.env.GOOGLE_KEY,
  Twitch_Bot_Options: {
    options: {
      debug: true
    },
    connection: {
      cluster: 'aws',
      reconnect: true
    },
    identity: {
      username: 'FiresideBOT',
      password: process.env.TWITCH_KEY
    },
    channels: ['RevenantEverest', 'thizzpill707', 'kinotheproducer']
  }
}
