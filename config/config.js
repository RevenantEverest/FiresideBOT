module.exports = {
  Discord: require('discord.js'),
  TMI: require('tmi.js'),
  tickets: {
    id: 0,
    open_tickets: [],
    closed_tickets: []
  },
  servers: {},
  Discord_Users_Count: 0,
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
    channels: ['RevenantEverest', 'Atsuumo']
  }
}
