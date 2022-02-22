import { Response } from 'express';
import JWT from 'jsonwebtoken';

interface User {
    id: number,
    username: string,
    discriminator: number,
    discord_id: string,
    avatarUrl: string,
    token?: string
};

const tokenSecret = process.env.TOKEN_SECRET as string;

async function issueToken(res: Response, user: User) {
    const options = {
        expiresIn: "12h"
    };

    const token = JWT.sign(user, tokenSecret, options);

    const payload = {
        ...user,
        token: token
    };

    return res.json({ results: payload });
};

export default issueToken;