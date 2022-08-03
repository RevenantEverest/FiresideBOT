import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('fortunes')
class Fortune extends BaseEntity {

    constructor(
        id: number,
        guild_id: string,
        fortune: string,
        created_by: string,
        created_at: Date,
        updated_at: Date
    ) {
        super();
        this.id = id;
        this.guild_id = guild_id;
        this.fortune = fortune;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, unique: true })
    guild_id: string;

    @Column({ type: "varchar", length: 1024, unique: true })
    fortune: string;

    /* Discord ID of the user who created the Fortune */
    @Column({ type: "varchar", length: 20, unique: true })
    created_by: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};

export default Fortune;
