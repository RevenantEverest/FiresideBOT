module.exports = {
  servers: [],
  Discord_Options: {
    version: 'v1.3.0',
    updatePending: false,
    modules: {
      Admin: true,
      Economy: true,
      Fun: true,
      GameStats: true,
      Info: true,
      Music: true
    }
  },
  Discord_Users_Count: 0,
  Twitch_Options: {
    options: {
      debug: false
    },
    connection: {
      cluster: 'aws',
      reconnect: true
    },
    identity: {
      username: 'FiresideBOT',
      password: process.env.TWITCH_KEY
    },
    channels: ['RevenantEverest', 'Atsuumo', 'Wookie']
  }
};