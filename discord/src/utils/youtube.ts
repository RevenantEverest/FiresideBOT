import yts from 'yt-search';

import type { HandleReturn } from '@@types/promises.js';
import type { 
    SongInfo, 
    SearchOptions,
    VideoSearchOptions,
    PlaylistSearchOptions
} from '@@types/youtube.js';

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

export async function search(options: SearchOptions): Promise<HandleReturn<SongInfo>> {

    const search = await yts({
        ...options,
        pages: options.pages ?? 1
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

export async function videoSearch(options: VideoSearchOptions): Promise<HandleReturn<SongInfo>> {
    const search = await yts(options);

    if(!search) {
        return [undefined, new Error("No Results Found")];
    }

    const songInfo: SongInfo = {
        title: search.title,
        videoId: search.videoId,
        author: search.author.name,
        duration: search.duration.seconds,
        thumbnail_url: search.thumbnail ?? ""
    };

    return [songInfo, undefined];
};