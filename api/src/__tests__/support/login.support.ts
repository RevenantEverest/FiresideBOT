import JWT from 'jsonwebtoken';

import { ENV } from '../../constants/index.js';
import { AuthPayload } from '../../types/auth.js';

const authPayload: AuthPayload = {
    id: "2c00407c-6f8b-40c1-801d-818f847f99ad",
    username: "tester",
    discriminator: 1234,
    discord_id: "253238262776799587",
    avatar: "a_dc5vv4dn77xdkcx2und65cp4ke656a95"
};

function issueToken(): AuthPayload {
    const token = JWT.sign(authPayload, ENV.TOKEN_SECRET, {
        expiresIn: "5m"
    });

    authPayload.token = token;

    return authPayload;
};

export default issueToken;