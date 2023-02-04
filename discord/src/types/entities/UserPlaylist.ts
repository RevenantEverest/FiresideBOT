import { UserSong } from './UserSong';

export interface UserPlaylistCommon {
    id: number,
    discord_id: string
};

export interface UserPlaylist extends UserPlaylistCommon {
    name: string,
    is_public: boolean,
    is_default: boolean,
    created_at: Date,
    updated_at: Date,
    duration: number,
    songCount: number,
    songs?: UserSong[]
};

export interface UserPlaylistUpdate extends UserPlaylistCommon {
    name?: string,
    is_public?: boolean
};