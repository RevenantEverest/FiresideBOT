import { Request, Response, NextFunction } from 'express';
import { errors } from '../utils/index.js';

async function validateId(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id, 10);

    if(!id || !Number.isInteger(id)) {
        return errors.sendResponse({ res, message: "Invalid ID Parameter" });
    }
    else {
        res.locals.params = {
            id
        };
        next();
    }
};

export default validateId;