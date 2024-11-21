import yts from 'yt-search';
import UserAgent from 'user-agents';

import type { HandleReturn } from '@@types/promises.js';
import type { 
    SongInfo,
    SearchOptions,
    VideoSearchOptions
} from '@@types/youtube.js';

interface SearchInfo {
    queryType: "videoId" | "search",
    query: string
};

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

/**
 * The handler for determining which search method to use based on a request string. The request can either be a link or query
 */
export async function handleSearch(request: string): Promise<HandleReturn<SongInfo>> {
    const isLink: boolean = await isValidLink(request);

    const searchInfo: SearchInfo = {
        queryType: "search",
        query: request
    };

    if(isLink) {
        const videoId = await extractVideoId(request);

        if(!videoId) {
            return [undefined, new Error("Invalid Video ID")]
        }

        searchInfo.queryType = "videoId";
        searchInfo.query = request;
    }

    return (
        searchInfo.queryType === "search" ? 
        search({ search: searchInfo.query }) : 
        videoSearch({ videoId: searchInfo.query })
    );
};

export async function search(options: SearchOptions): Promise<HandleReturn<SongInfo>> {

    const search = await yts({
        ...options,
        pages: options.pages ?? 1,
        userAgent: new UserAgent().toString()
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