DROP TABLE IF EXISTS user_premium_records;
DROP TABLE IF EXISTS guild_premium_records;
DROP TABLE IF EXISTS premium_logs;

CREATE TABLE user_premium_records (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    start_date VARCHAR(255),
    end_date VARCHAR(255),
    active BOOLEAN
);

CREATE TABLE guild_premium_records (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    start_date VARCHAR(255),
    end_date VARCHAR(255),
    active BOOLEAN,
    issued_by VARCHAR(255)
);

CREATE TABLE premium_logs (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(255),
    discord_id VARCHAR(255),
    guild_id VARCHAR(255),
    price VARCHAR(255),
    currency VARCHAR(255),
    recurring BOOLEAN,
    buyer_email VARCHAR(255),
    date VARCHAR(255)
);