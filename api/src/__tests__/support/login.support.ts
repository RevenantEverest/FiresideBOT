import JWT from 'jsonwebtoken';

import { ENV } from '../../constants/index.js';
import { AuthPayload } from '../../types/auth.js';
import { AuthTestingPayload } from './types/auth.js';

function issueToken(authPayload: AuthPayload): AuthTestingPayload {
    const token = JWT.sign(authPayload, ENV.TOKEN_SECRET, {
        expiresIn: "5m"
    });

    const returnPayload: AuthTestingPayload = {
        ...authPayload,
        token,
        header: {
            Authorization: `Bearer ${token}`
        }
    };

    return returnPayload;
};

export default issueToken;