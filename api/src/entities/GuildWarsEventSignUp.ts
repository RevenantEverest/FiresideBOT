import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Unique
} from 'typeorm';

@Entity('guildwars_event_signups')
@Unique(['discord_id', 'event_title', 'event_time'])
class GuildWarsEventSignup extends BaseEntity {

    constructor(
        id: number,
        discord_id: string,
        event_title: string,
        event_time: string,
        created_at: Date
    ) {
        super();
        this.id = id;
        this.discord_id = discord_id;
        this.event_title = event_title;
        this.event_time = event_time;
        this.created_at = created_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20 })
    discord_id: string;

    @Column({ type: "varchar", length: 30 })
    event_title: string;

    @Column({ type: "varchar", length: 5 })
    event_time: string;

    @CreateDateColumn()
    created_at: Date;
};

export default GuildWarsEventSignup;