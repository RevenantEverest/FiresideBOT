import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { DEFAULTS } from '../constants/index.js';

@Entity('guild_settings')
class GuildSettings extends BaseEntity {

    constructor(
        id: number,
        guild_id: string,
        prefix: string,
        volume: number,
        rank_increase_rate: number,
        rank_complexity: number,
        rank_channel: string,
        currency_name: string,
        currency_increase_rate: number,
        created_at: Date,
        updated_at: Date
    ) {
        super();
        this.id = id;
        this.guild_id = guild_id;
        this.prefix = prefix;
        this.volume = volume;
        this.rank_increase_rate = rank_increase_rate;
        this.rank_complexity = rank_complexity;
        this.rank_channel = rank_channel;
        this.currency_name = currency_name;
        this.currency_increase_rate = currency_increase_rate;
        this.created_at = created_at;
        this.updated_at = updated_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, unique: true })
    guild_id: string;

    @Column({ 
        type: "varchar", 
        length: 20, 
        default: DEFAULTS.GENERAL_SETTINGS.PREFIX 
    })
    prefix: string;

    @Column({ 
        type: "int", 
        width: 3, 
        default: DEFAULTS.GENERAL_SETTINGS.VOLUME
    })
    volume: number;

    @Column({
        type: "int",
        width: 2,
        default: DEFAULTS.RANK_SETTINGS.GENERAL_INCREASE_RATE
    })
    rank_increase_rate: number;

    @Column({
        type: "int",
        width: 2,
        default: DEFAULTS.RANK_SETTINGS.COMPLEXITY
    })
    rank_complexity: number;

    @Column({ type: "varchar", length: 20, nullable: true })
    rank_channel: string;

    @Column({ 
        type: "varchar",
        length: 20,
        default: DEFAULTS.ECONOMY_SETTINGS.CURRENCY_NAME
    })
    currency_name: string;

    @Column({
        type: "int",
        width: 2,
        default: DEFAULTS.ECONOMY_SETTINGS.INCREASE_RATE
    })
    currency_increase_rate: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};

export default GuildSettings;