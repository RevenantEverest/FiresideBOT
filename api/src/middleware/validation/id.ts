import { Request, Response, NextFunction } from 'express';
import { errors, common } from '../../utils/index.js';

function testKey(key: string): boolean {
    const re: RegExp = new RegExp("({*.+}?)?((Id|_id)$|(^id$))", "gi");
    return re.test(key);
};

const exclude: string[] = ["guildId", "discordId"];

async function id(req: Request, res: Response, next: NextFunction) {

    if(!res.locals.params) {
        res.locals.params = {};
    }

    const errorFunc: Function = () => {
        return errors.sendResponse({ 
            res, 
            status: 400, 
            message: "Invalid ID Parameter" 
        });
    };

    const paramKeys: Array<string> = Object.keys(req.params).map((key: string) => {
        if(!testKey(key) || exclude.includes(key)) return null;
        return key;
    }).filter(common.truthy);

    if(paramKeys.length <= 0) {
        return errorFunc();
    }

    paramKeys.forEach((key: string) => {
        const id: number = parseInt(req.params[key], 10);

        if(!id || !Number.isInteger(id)) {
            return errorFunc();
        }

        res.locals.params[key] = id; 
    });

    next();
};

export default id;