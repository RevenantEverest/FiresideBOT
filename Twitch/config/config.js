module.exports = {
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
        channels: ['RevenantEverest']
      }
};