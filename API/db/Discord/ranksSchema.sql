DROP TABLE IF EXISTS discord_ranks;
DROP TABLE IF EXISTS discord_rank_records;
DROP TABLE IF EXISTS discord_rank_settings;

CREATE TABLE discord_ranks (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    rank_name VARCHAR(255),
    rank_number INT
);

CREATE TABLE discord_rank_records (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    discord_id VARCHAR(255),
    xp BIGINT
);

CREATE TABLE discord_rank_settings (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    general_increase_rate INT,
    complexity INT,
    channel_id VARCHAR(255)
);