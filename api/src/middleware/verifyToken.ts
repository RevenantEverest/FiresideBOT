import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

const tokenSecret = process.env.TOKEN_SECRET as string;

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const bearer: Array<string> = bearerHeader.split(" ");
    const bearerToken: string = bearer[1];

    JWT.verify(bearerToken, tokenSecret, (err, authData) => {
        if(err) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        console.log(authData);

        return next();
    });
};

export default verifyToken;