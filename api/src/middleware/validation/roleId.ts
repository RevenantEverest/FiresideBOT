import { Request, Response, NextFunction } from 'express';

import { errors, discord } from '../../utils/index.js';

async function roleId(req: Request, res: Response, next: NextFunction) {
    const roleId: string = req.params.roleId;
    const isValidId: boolean = discord.isValidId(roleId);

    if(!res.locals.params) {
        res.locals.params = {};
    }

    if(!isValidId) {
        return errors.sendResponse({ res, status: 400, message: "Invalid ID Parameter" });
    }

    res.locals.params["roleId"] = roleId;
    next();
};

export default roleId;