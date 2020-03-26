DROP TABLE IF EXISTS currency_settings;
DROP TABLE IF EXISTS discord_currency;

CREATE TABLE currency_settings (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    currency_name VARCHAR(255),
    currency_increase_rate INT
);

CREATE TABLE discord_currency (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    guild_id VARCHAR(255),
    currency BIGINT
);