import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import GuildSong from './GuildSong.js';
import GuildPlaylistRole from './GuildPlaylistRole.js';

@Entity('guild_playlists')
class GuildPlaylist extends BaseEntity {

    constructor(
        id: number,
        guild_id: string,
        name: string,
        created_at: Date,
        updated_at: Date,

        songs: GuildSong[],
        roles: GuildPlaylistRole[]
    ) {
        super();
        this.id = id;
        this.guild_id = guild_id;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;

        this.songs = songs;
        this.roles = roles;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20 })
    guild_id: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* Relation */
    @OneToMany(
        () => GuildSong,
        (songs: GuildSong) =>  songs.playlist,
        { onDelete: "CASCADE" }
    )
    songs: GuildSong[];

    @OneToMany(
        () =>  GuildPlaylistRole,
        (roles: GuildPlaylistRole) => roles.playlist,
        { onDelete: "CASCADE" }
    )
    roles: GuildPlaylistRole[];
};

export default GuildPlaylist;