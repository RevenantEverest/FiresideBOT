import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity('guild_currency_records')
class GuildCurrencyRecord extends BaseEntity {

    constructor(
        id: number,
        guild_id: string,
        discord_id: string,
        balance: number
    ) {
        super();
        this.id = id;
        this.guild_id = guild_id;
        this.discord_id = discord_id;
        this.balance = balance;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20 })
    guild_id: string;

    @Column({ type: "varchar", length: 20 })
    discord_id: string;

    @Column({ type: "bigint" })
    balance: number;
};

export default GuildCurrencyRecord;