
const commando = require('discord.js-commando');

class HelloWorldCommand extends commando.Command {

  constructor(client) {
    super(client, {
      name: 'hello',
      group: 'text-commands',
      memberName: 'hello',
      description: 'Returns Hello World'
    });
  }

  async run(message, args) {
    message.reply(`Hello World \n Another Hello World`);
  }
}

module.exports = HelloWorldCommand;
