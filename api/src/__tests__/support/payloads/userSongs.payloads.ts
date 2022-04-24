import { SongInfo } from '../../../types/youtube.js';

export const INVALID = {
    playlist_id: 99875,
    request: "fake request"
};

export const VALID_CREATE = {
    playlist_id: 1,
    request: "test request"
};

export const MOCK_RETURN: SongInfo = {
    title: "TestTrack",
    videoId: "d7hGaK98sHH",
    author: "Jest",
    duration: 123,
    thumbnail_url: "thumbnail_image"
};