import { SongInfo } from '../../../types/youtube.js';
import { PREMIUM_LIMITS } from '../../../constants/index.js';

export const INVALID = {
    playlist_id: 8876235,
    request: "bad request"
};

export const VALID_CREATE = {
    playlist_id: 1,
    request: "guild song test request"
};

export const MOCK_RETURN: SongInfo = {
    title: "JukeBox",
    videoId: "hjj87hahsOl",
    author: "Fireside",
    duration: 432,
    thumbnail_url: "thumbnail_here"
};

export const INVALID_NON_PREMIUM_MOCK_RETURN: SongInfo = {
    title: "No Premium Track",
    videoId: "lo9187kJyHa",
    author: "BestAuthor",
    duration: PREMIUM_LIMITS.SONG_DURATION + 1,
    thumbnail_url: "thumbnail_here"
};

export const VALID_NON_PREMIUM_MOCK_RETURN: SongInfo = {
    title: "WorkingTrack",
    videoId: "r91nbMxcwd6",
    author: "CorrectAuthor",
    duration: PREMIUM_LIMITS.SONG_DURATION,
    thumbnail_url: "thumbnail_image"
};