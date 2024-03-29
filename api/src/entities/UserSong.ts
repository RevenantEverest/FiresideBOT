import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import UserPlaylist from './UserPlaylist.js';

@Entity('user_songs')
class UserSong extends BaseEntity {

    constructor(
        id: number,
        playlist: UserPlaylist,
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
        () => UserPlaylist,
        (playlist: UserPlaylist) => playlist.songs,
        { cascade: true, onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "playlist_id" })
    playlist: UserPlaylist;

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

export default UserSong;