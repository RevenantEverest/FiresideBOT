import { Request, Response, NextFunction } from 'express';

import { GuildPlaylist, GuildSong } from '../../../entities/index.js';
import { ResponseLocalsParams } from '../../../types/responseLocals.js';
import { SongInfo } from '../../../types/youtube.js';

import { PREMIUM_LIMITS } from '../../../constants/index.js';
import { errors, entities, youtube } from '../../../utils/index.js';

async function create(req: Request, res: Response, next: NextFunction) {

    const { guildId, playlistId }: ResponseLocalsParams = res.locals.params;

    let request: string = req.body.request;
    const isLink: boolean = await youtube.isValidLink(request);

    if(isLink) {
        const videoId = await youtube.extractVideoId(request);

        if(!videoId) {
            return errors.sendResponse({ res, next, message: "Video ID Could Not Be Extracted From Link" });
        }

        request = videoId;
    }

    const [playlist, findPlaylistErr] = await entities.findOne<GuildPlaylist>(GuildPlaylist, {
        where: {
            id: playlistId,
            guild_id: guildId
        }
    });

    if(findPlaylistErr) {
        return errors.sendResponse({ res, next, err: findPlaylistErr, message: "Error Finding GuildPlaylist" });
    }

    if(!playlist) {
        return errors.sendResponse({ res, status: 404, message: "No GuildPlaylist Found" });
    }

    const [youtubeSearchRes, youtubeSearchErr] = await youtube.handleSearch(request, isLink);

    if(youtubeSearchErr) {
        return errors.sendResponse({ res, next, err: youtubeSearchErr, message: "YouTube Search Error" });
    }

    if(!youtubeSearchRes) {
        return errors.sendResponse({ res, status: 404, message: "YouTube Search Results Not Found" });
    }

    const songInfo: SongInfo = youtubeSearchRes;

    if(songInfo.duration > PREMIUM_LIMITS.SONG_DURATION) {
        return errors.sendResponse({ res, status: 400, message: "Non Premium Guild Playlist Song Length Limited To 10 Minutes" });
    }

    const [findRes, findErr] = await entities.findOne<GuildSong>(GuildSong, {
        where: {
            playlist: {
                id: playlist.id,
                guild_id: guildId
            },
            video_id: songInfo.videoId
        }
    });

    if(findErr) {
        return errors.sendResponse({ res, next, err: findErr, message: "Message Checking GuildSong" });
    }

    if(findRes) {
        return errors.sendResponse({ res, status: 400, message: "Song Already Exists" });
    }

    const [guildSong, insertErr] = await entities.insert<GuildSong>(GuildSong, {
        title: songInfo.title,
        author: songInfo.author,
        duration: songInfo.duration,
        thumbnail_url: songInfo.thumbnail_url,
        video_id: songInfo.videoId,
        playlist: {
            id: playlist.id
        }
    });

    if(insertErr) {
        return errors.sendResponse({ res, next, err: insertErr, message: "Error Inserting GuildSong" });
    }

    if(!guildSong) {
        return errors.sendResponse({ res, next, message: "No GuildSong Returned From Insert" });
    }

    return res.json({ results: guildSong });
};

export default create;