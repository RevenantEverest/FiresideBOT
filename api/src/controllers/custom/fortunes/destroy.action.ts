import { Request, Response, NextFunction } from 'express';

import { Fortune } from '../../../entities/index.js';
import { ResponseLocals } from '../../../types/responseLocals.js';

import { errors, entities, discord } from '../../../utils/index.js';

async function destroy(req: Request, res: Response, next: NextFunction) {
    
};

export default destroy;