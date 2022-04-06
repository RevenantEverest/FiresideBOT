import { Request, Response, NextFunction } from 'express';
import { errors } from '../utils/index.js';

async function validateId(req: Request, res: Response, next: NextFunction) {
    const re: RegExp = new RegExp("({*.+}?)?((Id|_id)$|(^id$))", "gi");

    const paramKeys: string[] = Object.keys(req.params);
    const paramKeysString: string = paramKeys.join(" ");
    const paramKeysTest: boolean = re.test(paramKeysString)
    const idParamKeyMatch = paramKeysString.match(re);

    const errorFunc: Function = () => {
        return errors.sendResponse({ 
            res, 
            status: 400, 
            message: "Invalid ID Parameter" 
        });
    };

    if(paramKeys.length <= 0 || !paramKeysTest || !idParamKeyMatch) {
        return errorFunc();
    }

    const idParamKey: string = idParamKeyMatch[0];
    const id: number = parseInt(req.params[idParamKey], 10);

    if(!id || !Number.isInteger(id)) {
        return errorFunc();
    }

    res.locals.params = {
        [idParamKey]: id
    };
    next();
};

export default validateId;