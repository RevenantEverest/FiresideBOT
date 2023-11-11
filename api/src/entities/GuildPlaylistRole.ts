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

@Entity('guild_playlist_roles')
class GuildPlaylistRole extends BaseEntity {

    constructor(
        id: number,
        playlist: GuildPlaylist,
        role_id: string,
        created_at: Date
    ) {
        super();
        this.id = id;
        this.playlist = playlist;
        this.role_id = role_id;
        this.created_at = created_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => GuildPlaylist,
        (playlist: GuildPlaylist) => playlist.roles,
        { cascade: true, onDelete: "CASCADE" }
    )
    @JoinColumn({ name: "playlist_id" })
    playlist: GuildPlaylist;

    @Column({ type: "varchar", length: 20 })
    role_id: string;

    @CreateDateColumn()
    created_at: Date;
};

export default GuildPlaylistRole;