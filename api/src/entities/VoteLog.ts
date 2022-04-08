import { 
    Entity, 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn
} from 'typeorm';

@Entity('vote_logs')
class VoteLog extends BaseEntity {

    constructor(
        id: number,
        discord_id: string,
        created_at: Date
    ) {
        super();
        this.id = id;
        this.discord_id = discord_id;
        this.created_at = created_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    /*
        Using discord_id instead of User relation due to 
        ability to vote without being a dashboard user
    */
    @Column({ type: "varchar", length: 20 })
    discord_id: string;

    @CreateDateColumn()
    created_at: Date;
};

export default VoteLog;