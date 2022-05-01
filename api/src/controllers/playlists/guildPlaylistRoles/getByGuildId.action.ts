import { Request, Response, NextFunction } from 'express';

import { GuildPlaylistRole } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function getByGuildId(req: Request, res: Response, next: NextFunction) {

};

export default getByGuildId;