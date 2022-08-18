import { Request, Response, NextFunction } from 'express';

import { Fortune } from '../../../entities/index.js';
import { AuthenticatedResponseLocals } from '../../../types/responseLocals.js';
import { PaginatedResponse } from '../../../types/pagination.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {
    
    const { limit, offset } = res.locals as AuthenticatedResponseLocals;

    const [fortunes, err] = await entities.indexAndCount<Fortune>(Fortune, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error finding Fortunes" });
    }

    if(!fortunes) {
        return errors.sendResponse({ res, status: 404, message: "No Fortunes found" });
    }

    const response: PaginatedResponse<Fortune> = pagination.paginateResponse<Fortune>(req, res, fortunes);

    return res.json(response);
};

export default index;