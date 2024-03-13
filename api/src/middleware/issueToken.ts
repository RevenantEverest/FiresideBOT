import type { Response } from 'express';
import type { AuthPayload } from '@@types/auth.js';

import JWT from 'jsonwebtoken';
import { ENV } from '@@constants/index.js';

async function issueToken(res: Response, payload: AuthPayload) {
    const options = {
        expiresIn: "12h"
    };

    const token = JWT.sign(payload, ENV.TOKEN_SECRET, options);

    payload.token = token;

    return res.json({ results: payload });
};

export default issueToken;