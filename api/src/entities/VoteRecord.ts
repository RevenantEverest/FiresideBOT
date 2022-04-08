import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('vote_records')
class VoteRecord extends BaseEntity {

    constructor(
        id: number,
        discord_id: string,
        amount: number,
        created_at: Date,
        updated_at: Date
    ) {
        super();
        this.id = id;
        this.discord_id = discord_id;
        this.amount = amount;
        this.created_at = created_at;
        this.updated_at = updated_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, unique: true })
    discord_id: string;

    @Column({ type: "int" })
    amount: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};

export default VoteRecord;

