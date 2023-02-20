import { CommandDispatch } from '../../../../types/commands.js';

async function setupGame(dispatch: CommandDispatch) {
    await dispatch.channel.send("**Dealers Hand:**");
    await dispatch.channel.send();
};

export default setupGame;