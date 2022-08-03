import JWT from 'jsonwebtoken';

import { CommandDispatch } from '../types/commands.js';
import { AuthPayload } from '../types/authPayload.js';

import { ENV } from '../constants/index.js';

async function issueToken(dispatch: CommandDispatch) {
    const authPayload: AuthPayload = {
        username: dispatch.author.username,
        discord_id: dispatch.author.id,
        discriminator: parseInt(dispatch.author.discriminator, 10),
        avatar: dispatch.author.avatar
    };

    return JWT.sign(authPayload, ENV.TOKEN_SECRET, {
        expiresIn: 60
    });
};

export default issueToken;