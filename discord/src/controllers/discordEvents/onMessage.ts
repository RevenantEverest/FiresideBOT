import { Client, Message } from 'discord.js';
import { CommandFile } from '../../types/commands.js';

import config from '../../config/index.js';

const PREFIX = "?";

function onMessage(bot: Client, message: Message) {
    if(!PREFIX || !message.guild || !message.content.startsWith(PREFIX)) 
        return;

    if(!config.servers.map(server => server.id).includes(message.guild.id)) {
        config.servers.push({
            id: message.guild.id,
            premium: false,
            queue: {
                playing: false,
                info: [],
                currentSongEmbed: [],
                genres: [],
                options: {
                    volume: 50,
                    loop: false,
                    recommendations: false,
                    voteToSkip: false
                }
            }
        });
    }

    const args = message.content.substring(PREFIX.length).split(" ");
    const server = config.servers[config.servers.map(server => server.id).indexOf(message.guild?.id)];
    const options = config.updatePending;
    const disabledCommands = null;
    const userState = {};

    const commandFile = config.commands.filter((command: CommandFile) => {
        if(command.name === args[0].toLowerCase() || command.aliases && command.aliases.includes(args[0].toLowerCase()))
            return command;
    })[0];

    if(!commandFile) {
        return;
    }
    else {
        commandFile.run({PREFIX, bot, message, args, server, options, userState});
    }
};

export default onMessage;