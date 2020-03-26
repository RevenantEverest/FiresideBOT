DROP TABLE IF EXISTS changelogs;
DROP TABLE IF EXISTS working_changelogs;
DROP TABLE IF EXISTS discord_tokens;
DROP TABLE IF EXISTS vote_logs;
DROP TABLE IF EXISTS vote_records;
DROP TABLE IF EXISTS command_error_logs; 

CREATE TABLE changelogs (
    id SERIAL PRIMARY KEY,
    content TEXT,
    version VARCHAR(25),
    release_date VARCHAR(255),
    type VARCHAR(255)
);

CREATE TABLE working_changelogs (
    id SERIAL PRIMARY KEY,
    content TEXT,
    version VARCHAR(255),
    type VARCHAR(255)
);

CREATE TABLE discord_tokens (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    token VARCHAR(255),
    refresh_token VARCHAR(255),
    expires_in VARCHAR(255)
);

CREATE TABLE vote_logs (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    date VARCHAR(255)
);

CREATE TABLE vote_records (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    amount BIGINT,
    date VARCHAR(255)
);

CREATE TABLE command_error_logs (
    id SERIAL PRIMARY KEY,
    command VARCHAR(255),
    args VARCHAR(255),
    guild_id VARCHAR(255),
    discord_id VARCHAR(255),
    error_message VARCHAR(255),
    error VARCHAR(1024),
    date VARCHAR(255)
);