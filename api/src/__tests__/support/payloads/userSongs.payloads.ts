import { SongInfo } from '../../../types/youtube.js';
import { PREMIUM_LIMITS } from '../../../constants/index.js';

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

export const INVALID_NON_PREMIUM_MOCK_RETURN: SongInfo = {
    title: "AnotherTrack",
    videoId: "jjh36hh1knu",
    author: "MyFavoriteAuthor",
    duration: PREMIUM_LIMITS.SONG_DURATION + 1,
    thumbnail_url: "thumbnail_image"
};

export const VALID_NON_PREMIUM_MOCK_RETURN: SongInfo = {
    title: "MyFavoriteTrack",
    videoId: "lka89op12fv",
    author: "TheWorstAuthor",
    duration: PREMIUM_LIMITS.SONG_DURATION,
    thumbnail_url: "thumbnail_image"
};