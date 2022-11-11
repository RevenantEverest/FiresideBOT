import { SongInfo } from '../types/youtube.js';
import { HandleReturn } from '../types/promises.js';
import * as youtube from './youtube.js';

export async function requestSong(request: string): HandleReturn<SongInfo> {
    const isLink: boolean = await youtube.isValidLink(request);

    if(isLink) {
        const videoId = await youtube.extractVideoId(request);

        if(!videoId) {
            return [undefined, new Error("Invalid Video ID")];
        }

        request = videoId;        
    }

    const [youtubeSearchRes, youtubeSearchErr] = await youtube.handleSearch(request, isLink);

    if(youtubeSearchErr) {
        return [undefined, youtubeSearchErr];
    }

    return [youtubeSearchRes, undefined];
};