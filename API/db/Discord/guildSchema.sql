DROP TABLE IF EXISTS bot_guilds;
DROP TABLE IF EXISTS guild_playlists;
DROP TABLE IF EXISTS guild_settings;
DROP TABLE IF EXISTS guild_songs;
DROP TABLE IF EXISTS guild_log_settings;
DROP TABLE IF EXISTS guild_welcome_message;

CREATE TABLE bot_guilds (
    id SERIAL PRIMARY KEY,
    guild_name VARCHAR(255),
    guild_id VARCHAR(255),
    date VARCHAR(255)
);

CREATE TABLE guild_playlists (
    playlist_id SERIAL PRIMARY KEY,
    roles text[],
    guild_id VARCHAR(255),
    name VARCHAR(255)
);

CREATE TABLE guild_settings (
    guild_id VARCHAR(255),
    prefix VARCHAR(10)
);

CREATE TABLE guild_songs (
    song_id SERIAL PRIMARY KEY,
    playlist_id BIGINT,
    title VARCHAR(255),
    author VARCHAR(255),
    link VARCHAR(255),
    duration VARCHAR(255),
    thumbnail_url VARCHAR(255)
);

CREATE TABLE guild_log_settings (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    enabled BOOLEAN,
    channel_id VARCHAR(255)
);

CREATE TABLE guild_welcome_message (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    message VARCHAR(1024)
);

CREATE TABLE guild_logs (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    date VARCHAR(255)
);