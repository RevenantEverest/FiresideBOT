import JWT from 'jsonwebtoken';

import { AuthPayload } from '../types/authPayload.js';

import { ENV } from '../constants/index.js';

async function issueToken() {

    const authPayload: AuthPayload = {
        username: "FiresideBOT",
        discord_id: ENV.DISCORD.CLIENT_ID,
        discriminator: 1337,
        avatar: "https://i.imgur.com/RebNvTb.png"
    };

    return JWT.sign(authPayload, ENV.TOKEN_SECRET, {
        expiresIn: 60
    });
};

export default issueToken;