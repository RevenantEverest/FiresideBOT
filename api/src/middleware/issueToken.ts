import { Response } from 'express';
import JWT from 'jsonwebtoken';

import { ENV } from '../constants/index.js';

interface Payload {
    id: number,
    username: string,
    discriminator: number,
    discord_id: string,
    avatar: string,
    token?: string
};

async function issueToken(res: Response, payload: Payload) {
    const options = {
        expiresIn: "12h"
    };

    const token = JWT.sign(payload, ENV.TOKEN_SECRET, options);

    payload.token = token;

    return res.json({ results: payload });
};

export default issueToken;