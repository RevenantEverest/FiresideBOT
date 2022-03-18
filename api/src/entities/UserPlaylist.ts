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
import User from './User.js';
import UserSong from './UserSong.js';

@Entity('user_playlists')
class UserPlaylist extends BaseEntity {

    constructor(
        id: number,
        user: User,
        name: string,
        created_at: Date,
        updated_at: Date,

        songs: UserSong[]
    ) {
        super();
        this.id = id;
        this.user = user;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;

        this.songs = songs;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => User,
        (user: User) => user.playlists
    )
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* Relations */
    @OneToMany(
        () => UserSong,
        (songs: UserSong) => songs.playlist
    )
    songs: UserSong[];
};

export default UserPlaylist;