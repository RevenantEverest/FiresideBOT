import { CommandParams, CommandConfig } from '../../../types/commands.js';

function Ping({ message }: CommandParams) {
    return message.channel.send("Pong");
};

export const config: CommandConfig = {
    name: "ping",
    displayName: "Ping",
    aliases: [],
    category: "Info",
    description: "",
    example: ""
};

export default Ping;