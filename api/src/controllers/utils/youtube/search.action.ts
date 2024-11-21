import type { Request, Response } from 'express';
import { errors, youtube } from '../../../utils/index.js';

async function search(req: Request, res: Response) {

    if(!req.params.request) {
        return errors.sendResponse({ res, status: 400, message: "Missing Request Param" });
    }

    const [songInfo, err] = await youtube.handleSearch(req.params.request);

    if(err || !songInfo) {
        return errors.sendResponse({
            res,
            err,
            message: err?.message ?? "No SongInfo Returned"
        });
    }

    return res.json({ results: songInfo });
};

export default search;