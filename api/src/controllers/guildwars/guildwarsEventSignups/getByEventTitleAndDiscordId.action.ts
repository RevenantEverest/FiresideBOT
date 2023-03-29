import { Request, Response, NextFunction } from 'express';

import { GuildWarsEventSignup } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';

import { errors, entities } from '../../../utils/index.js';

async function getByEventTitleAndDiscordId(req: Request, res: Response, next: NextFunction) {

    const { eventName, discordId } = req.params;

    
};

export default getByEventTitleAndDiscordId;