import JWT from 'jsonwebtoken';
import { Message } from 'discord.js';

import { AuthPayload } from '../types/authPayload.js';

import { ENV } from '../constants/index.js';

async function issueToken(message: Message) {
    const authPayload: AuthPayload = {
        username: message.author.username,
        discord_id: message.author.id,
        discriminator: parseInt(message.author.discriminator, 10),
        avatar: message.author.avatar
    };

    return JWT.sign(authPayload, ENV.TOKEN_SECRET, {
        expiresIn: 60
    });
};

export default issueToken;