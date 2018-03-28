
const commando = require('discord.js-commando');

class SocialMedia extends commando.Command {

  constructor(client) {
    super(client, {
      name: 'social',
      group: 'social-media',
      memberName: 'social',
      description: `Lists RevenantEverest's social media links`,
    })
  }

  async run(message, args) {
    message.reply(`Revenant's Social Media: \n
      Facebook: https://www.facebook.com/RevenantEeverest \n
      Twitter: https://twitter.com/RevenantEverest \n
      Instagram:  \n

    `)
  }
}

module.exports = SocialMedia;
