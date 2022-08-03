import playdl from 'play-dl';

import { HandleReturn } from '../types/promises.js';
import { SongInfo } from '../types/youtube.js';
import { URLS } from '../constants/index.js';

const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/gi;

export async function isValidLink(str: string): Promise<boolean> {
    const re = new RegExp(youtubeRegex);
    return re.test(str);
};

export async function extractVideoId(str: string): Promise<string | null> {
    const re = new RegExp(youtubeRegex);
    const exec = re.exec(str);

    if(!exec) {
        return null;
    }

    return exec[1];
};

export async function handleSearch(request: string, isLink: boolean): Promise<HandleReturn<SongInfo>> {
    let youtubeLink = request;

    if(!isLink) {
        const search = await playdl.search(request, { 
            source: { youtube: "video" },
            limit: 1
        });

        if(!search || search.length < 1) {
            return [undefined, new Error("No Results Found")];
        }

        const videoId = search[0].id;
        youtubeLink = URLS.YOUTUBE_VIDEO + videoId;
    }

    return await getSongInfo(youtubeLink);
};

export async function getSongInfo(link: string): Promise<HandleReturn<SongInfo>> {
    const info = await playdl.video_basic_info(link);

    if(!info) {
        return [undefined, new Error("Info is Undefined")];
    }

    const { id, title, channel, durationInSec, thumbnails } = info.video_details;
    const thumbnail_url = thumbnails[thumbnails.length - 1].url;

    if(!id || !title || !channel?.name) {
        return [undefined, new Error("Missing Info Elements")];
    }

    const songInfo: SongInfo = {
        title,
        videoId: id,
        author: channel.name,
        duration: durationInSec,
        thumbnail_url
    };

    return [songInfo, undefined];
};