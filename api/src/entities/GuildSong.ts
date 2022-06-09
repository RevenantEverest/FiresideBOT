import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import GuildPlaylist from './GuildPlaylist.js';

@Entity('guild_songs')
class GuildSong extends BaseEntity {

    constructor(
        id: number,
        playlist: GuildPlaylist,
        title: string,
        author: string,
        video_id: string,
        duration: number,
        thumbnail_url: string,
        created_at: Date
    ) {
        super();
        this.id = id;
        this.playlist = playlist;
        this.title = title;
        this.author = author;
        this.video_id = video_id;
        this.duration = duration;
        this.thumbnail_url = thumbnail_url;
        this.created_at = created_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => GuildPlaylist,
        (playlist: GuildPlaylist) => playlist.songs
    )
    @JoinColumn({ name: "playlist_id" })
    playlist: GuildPlaylist;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "varchar", length: 255 })
    author: string;

    @Column({ type: "varchar", length: 11 })
    video_id: string;

    @Column({ type: "int" })
    duration: number;

    @Column({ type: "varchar", length: 255 })
    thumbnail_url: string;

    @CreateDateColumn()
    created_at: Date;
};

export default GuildSong;