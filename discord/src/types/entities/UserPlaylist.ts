import { UserSong } from './UserSong';

export interface UserPlaylist {
    id: number,
    discord_id: string,
    name: string,
    is_public: boolean,
    created_at: Date,
    updated_at: Date,
    duration: number,
    songCount: number,
    songs?: UserSong[]
};