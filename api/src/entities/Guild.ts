import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn
} from 'typeorm';

@Entity('guilds')
class Guild extends BaseEntity {

    constructor(
        id: number,
        guild_id: string,
        created_at: Date,
        deleted_at: Date
    ) {
        super();
        this.id = id;
        this.guild_id = guild_id;
        this.created_at = created_at;
        this.deleted_at = deleted_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, unique: true })
    guild_id: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
};

export default Guild;