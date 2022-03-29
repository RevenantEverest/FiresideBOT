import { 
    Entity, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import UserSong from './UserSong.js';

@Entity('user_playlists')
class UserPlaylist extends BaseEntity {

    constructor(
        id: number,
        discord_id: string,
        name: string,
        created_at: Date,
        updated_at: Date,

        songs: UserSong[]
    ) {
        super();
        this.id = id;
        this.discord_id = discord_id;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;

        this.songs = songs;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20 })
    discord_id: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* Relations */
    @OneToMany(
        () => UserSong,
        (songs: UserSong) => songs.playlist,
        { onDelete: "CASCADE" }
    )
    songs: UserSong[];
};

export default UserPlaylist;