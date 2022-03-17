import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('discord_tokens')
class DiscordToken extends BaseEntity {

    constructor(
        id: number,
        discord_id: string,
        access_token: string,
        refresh_token: string,
        expires_in: string,
        created_at: Date,
        updated_at: Date
    ) {
        super();
        this.id = id;
        this.discord_id = discord_id;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.expires_in = expires_in;
        this.created_at = created_at;
        this.updated_at = updated_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, unique: true })
    discord_id: string;

    @Column({ type: "varchar", length: 30 })
    access_token: string;

    @Column({ type: "varchar", length: 30 })
    refresh_token: string;

    @Column({ type: "varchar", length: 10 })
    expires_in: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};

export default DiscordToken;