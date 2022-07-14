import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

function Ping({ message }: CommandParams) {
    return message.reply("Pong");
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "",
    example: ""
};

export default Ping;