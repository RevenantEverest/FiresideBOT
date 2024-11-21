import { Request, Response, NextFunction } from 'express';

import UserSong from '../../../entities/UserSong.js';
import UserPlaylist from '../../../entities/UserPlaylist.js';

import { youtube, errors, entities } from '../../../utils/index.js';
import { SongInfo } from '../../../types/youtube.js';
import { PREMIUM_LIMITS } from '../../../constants/index.js';

async function create(req: Request, res: Response, next: NextFunction) {

    let request: string = req.body.request;
    const isLink: boolean = await youtube.isValidLink(request);

    if(isLink) {
        const videoId = await youtube.extractVideoId(request);
        
        if(!videoId) {
            return errors.sendResponse({ res, next, message: "Video ID Could Not Be Extracted From Link" });
        }

        request = videoId;
    }

    const [playlist, findPlaylistErr] = await entities.findOne<UserPlaylist>(UserPlaylist, {
        where: {
            id: req.body.playlist_id,
            discord_id: res.locals.auth.discord_id
        }
    });

    if(findPlaylistErr) {
        return errors.sendResponse({ res, next, err: findPlaylistErr, message: "Error Finding UserPlaylist" });
    }

    if(!playlist) {
        return errors.sendResponse({ res, status: 404, message: "No UserPlaylist Found" });
    }

    const [youtubeSearchRes, youtubeSearchErr] = await youtube.handleSearch(request);

    if(youtubeSearchErr) {
        return errors.sendResponse({ res, next, err: youtubeSearchErr, message: "YouTube Search Error" });
    }

    if(!youtubeSearchRes) {
        return errors.sendResponse({ res, status: 404, message: "YouTube Search Results Not Found" });
    }

    const songInfo: SongInfo = youtubeSearchRes;

    if(songInfo.duration > PREMIUM_LIMITS.SONG_DURATION) {
        return errors.sendResponse({ res, status: 400, message: "Non Premium Playlist Songs Limited To 10 Minutes" });
    }

    const [findRes, findErr] = await entities.findOne<UserSong>(UserSong, {
        where: {
            playlist: {
                id: req.body.playlist_id,
                discord_id: res.locals.auth.discord_id
            },
            video_id: songInfo.videoId
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Error Checking UserSong" });
    }

    if(findRes) {
        return errors.sendResponse({ res, status: 400, message: "Song Already Exists" });
    }

    const [userSong, insertErr] = await entities.insert<UserSong>(UserSong, {
        title: songInfo.title,
        author: songInfo.author,
        duration: songInfo.duration,
        thumbnail_url: songInfo.thumbnail_url,
        video_id: songInfo.videoId,
        playlist: {
            id: req.body.playlist_id
        }
    });

    if(insertErr) {
        return errors.sendResponse({ res, next, err: insertErr, message: "Error Inserting UserSong" });
    }

    if(!userSong) {
        return errors.sendResponse({ res, next, message: "No UserSong Returned From Insert" });
    }

    return res.json({ results: userSong });
};

export default create;