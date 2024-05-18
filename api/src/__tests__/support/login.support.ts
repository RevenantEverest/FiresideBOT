import type { AuthPayload } from '@@types/auth.js';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';

import JWT from 'jsonwebtoken';
import { ENV } from '../../constants/index.js'; // Have to use manual path, jest confuses path alias with /tests/support/constants (12/30/23)

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