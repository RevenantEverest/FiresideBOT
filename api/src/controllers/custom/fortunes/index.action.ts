import { 
    Request, 
    NextFunction, 
    PaginatedResponse as PaginatedExpressResponse 
} from '@@types/express.js';

import { Fortune } from '@@entities/index.js';
import { PaginatedResponse } from '../../../types/pagination.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function index(req: Request, res: PaginatedExpressResponse, next: NextFunction) {
    
    const { limit, offset } = res.locals.pagination;

    const [fortunes, err] = await entities.indexAndCount<Fortune>(Fortune, {
        limit, offset
    });

    if(err || !fortunes) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error finding Fortunes",
            entityReturn: fortunes,
            missingEntityReturnMessage: "Unable to find Fortunes"
        });
    }

    const response: PaginatedResponse<Fortune> = pagination.paginateResponse<Fortune>(req, res, fortunes);

    return res.json(response);
};

export default index;