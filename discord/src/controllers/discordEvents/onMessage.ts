import { Client, Message } from 'discord.js';

function onMessage(bot: Client, message: Message) {
    if(message.content === "ping") {
        message.channel.send("pong");
        return;
    }
};

export default onMessage;