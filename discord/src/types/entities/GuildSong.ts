export interface GuildSong {
    id: number,
    title: string,
    author: string,
    video_id: string,
    duration: number,
    thumbnail_url: string,
    created_at: Date
};

export interface GuildSongCreate {
    playlist_id: number,
    request: string
};