import type { 
    OptionsWithSearch, 
    VideoMetadataOptions, 
    PlaylistMetadataOptions
} from 'yt-search';

export interface SongInfo {
    title: string,
    videoId: string,
    author: string,
    duration: number,
    thumbnail_url: string
};

export type VideoSearchOptions = VideoMetadataOptions;
export type PlaylistSearchOptions = PlaylistMetadataOptions;
export type SearchOptions = OptionsWithSearch;