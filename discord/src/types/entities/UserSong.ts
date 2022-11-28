export interface UserSong {
    id: number,
    title: string,
    author: string,
    video_id: string,
    duration: number,
    thumbnail_url: string,
    created_at: Date
};

export interface UserSongCreate {
    playlist_id: number,
    request: string
};