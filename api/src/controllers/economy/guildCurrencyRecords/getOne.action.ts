import { Request, Response, NextFunction } from 'express';
import { PaginatedResponse } from '../../../types/pagination.js';

import { GuildCurrencyRecord } from '../../../entities/index.js';

import { errors, entities, pagination } from '../../../utils/index.js';

async function getOne(req: Request, res: Response, next: NextFunction) {

};

export default getOne;