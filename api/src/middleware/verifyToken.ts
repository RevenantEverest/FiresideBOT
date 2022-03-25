import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

import { ENV } from '../constants/index.js';
import { errors } from '../utils/index.js';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const bearer: Array<string> = bearerHeader.split(" ");
    const bearerToken: string = bearer[1];

    JWT.verify(bearerToken, ENV.TOKEN_SECRET, (err, authData) => {
        if(err) {
            return errors.sendResponse({ res, next, err, status: 403, message: "Invalid Token" });
        }

        res.locals.auth = authData;

        return next();
    });
};

export default verifyToken;