import { 
    Entity, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn
} from 'typeorm';

@Entity('users')
class User extends BaseEntity {

    constructor(
        id: number,
        email: string,
        discord_id: string,
        twitch_id: string,
        created_at: Date
    ) {
        super();
        this.id = id;
        this.email = email;
        this.discord_id = discord_id;
        this.twitch_id = twitch_id;
        this.created_at = created_at;
    };

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "varchar", length: 255 })
    email: string;

    @Column({  type: "varchar", length: 20, unique: true, nullable: true })
    discord_id: string;

    @Column({ type: "varchar", length: 20, unique: true, nullable: true })
    twitch_id: string;

    @CreateDateColumn()
    created_at: Date;
};

export default User;