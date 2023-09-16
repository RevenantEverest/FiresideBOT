import yts from 'yt-search';

import { HandleReturn } from '../types/promises.js';
import { SongInfo } from '../types/youtube.js';

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

export async function handleSearch(request: string): Promise<HandleReturn<SongInfo>> {
    const search = await yts.search({
        search: request,
        pages: 1
    });

    if(!search.videos || search.videos.length < 1) {
        return [undefined, new Error("No Results Found")];
    }

    const { title, videoId, author, duration, thumbnail } = search.videos[0];
    
    const songInfo: SongInfo = {
        title,
        videoId,
        author: author.name,
        duration: duration.seconds,
        thumbnail_url: thumbnail ?? ""
    };

    return [songInfo, undefined];

};