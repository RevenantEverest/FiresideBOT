export interface GuildSetting {
    id: number,
    guild_id: string,
    prefix: string,
    volume: number,
    rank_increase_rate: number,
    rank_complexity: number,
    rank_channel: string,
    currency_name: string,
    currency_increase_rate: number,
    updated_at: Date
};