import { 
    Entity, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import User from './User.js';

@Entity('user_playlists')
class UserPlaylist extends BaseEntity {

    constructor(
        id: number,
        user: User,
        name: string,
        created_at: Date,
        updated_at: Date
    ) {
        super();
        this.id = id;
        this.user = user;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => User,
        (user:User) => user.playlists
    )
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};

export default UserPlaylist;