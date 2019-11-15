DROP TABLE IF EXISTS auto_role;
DROP TABLE IF EXISTS autodj;
DROP TABLE IF EXISTS bot_guilds;
DROP TABLE IF EXISTS custom_commands;
DROP TABLE IF EXISTS currency_settings;
DROP TABLE IF EXISTS disabled_commands;
DROP TABLE IF EXISTS discord_currency;
DROP TABLE IF EXISTS discord_tickets;
DROP TABLE IF EXISTS discord_tokens;
DROP TABLE IF EXISTS discord_closed_tickets;
DROP TABLE IF EXISTS discord_ranks;
DROP TABLE IF EXISTS discord_rank_records;
DROP TABLE IF EXISTS discord_rank_settings;
DROP TABLE IF EXISTS disabled_commands;
DROP TABLE IF EXISTS guild_log_settings;
DROP TABLE IF EXISTS guild_playlists;
DROP TABLE IF EXISTS guild_premium_records;
DROP TABLE IF EXISTS guild_settings;
DROP TABLE IF EXISTS guild_songs;
DROP TABLE IF EXISTS guild_welcome_message;
DROP TABLE IF EXISTS regulars;
DROP TABLE IF EXISTS twitch_banned_words;
DROP TABLE IF EXISTS twitch_currency;
DROP TABLE IF EXISTS twitch_queue;
DROP TABLE IF EXISTS user_playlists;
DROP TABLE IF EXISTS user_premium_records;
DROP TABLE IF EXISTS user_songs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS vote_logs;
DROP TABLE IF EXISTS vote_records;

CREATE TABLE auto_role (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    role_id VARCHAR(255)
);

CREATE TABLE autodj (
    id SERIAL PRIMARY KEY,
    user_id INT,
    redirect VARCHAR(1),
    guild_id BIGINT
);

CREATE TABLE bot_guilds (
    id SERIAL PRIMARY KEY,
    guild_name VARCHAR(255),
    guild_id VARCHAR(255),
    date VARCHAR(255)
);

CREATE TABLE custom_commands (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    created_by VARCHAR(255),
    input VARCHAR(255),
    output VARCHAR(1024),
    date VARCHAR(255)
);

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

CREATE TABLE discord_tickets (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    initial_message VARCHAR(1024),
    ticket_date VARCHAR(255)
);

CREATE TABLE discord_closed_tickets (
    ticket_id BIGINT,
    discord_id VARCHAR(255),
    initial_message VARCHAR(1024),
    ticket_date VARCHAR(255),
    close_date VARCHAR(255),
    closed_by VARCHAR(255),
    reason VARCHAR(1024)
);

CREATE TABLE discord_tokens (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    token VARCHAR(255),
    refresh_token VARCHAR(255),
    expires_in VARCHAR(255)
);

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

CREATE TABLE disabled_commands (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    command VARCHAR(255)
);

CREATE TABLE guild_playlists (
    playlist_id SERIAL PRIMARY KEY,
    roles text[],
    guild_id VARCHAR(255),
    name VARCHAR(255)
);

CREATE TABLE guild_premium_records (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    start_date VARCHAR(255),
    end_date VARCHAR(255),
    active BOOLEAN,
    issued_by VARCHAR(255)
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

CREATE TABLE regulars (
    regular_id SERIAL PRIMARY KEY,
    channel VARCHAR(255),
    regular_username VARCHAR(255)
);

CREATE TABLE twitch_banned_words (
    banned_word_id SERIAL PRIMARY KEY,
    channel VARCHAR(255),
    banned_word VARCHAR(255)
);

CREATE TABLE twitch_currency (
    id SERIAL PRIMARY KEY,
    twitch_username VARCHAR(255),
    channel VARCHAR(255),
    currency BIGINT
);

CREATE TABLE twitch_tracker (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    twitch_username VARCHAR(255),
    twitch_id VARCHAR(255),
    channel_id VARCHAR(255),
    role_id VARCHAR(255)
);

CREATE TABLE twitch_queue (
    id SERIAL PRIMARY KEY,
    channel VARCHAR(255),
    title VARCHAR(255),
    link VARCHAR(255),
    duration VARCHAR(255)
);

CREATE TABLE user_playlists (
    playlist_id SERIAL PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR(255)
);

CREATE TABLE user_premium_records (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    start_date VARCHAR(255),
    end_date VARCHAR(255),
    active BOOLEAN
);

CREATE TABLE user_songs (
    song_id SERIAL PRIMARY KEY,
    playlist_id BIGINT,
    title VARCHAR(255),
    author VARCHAR(255),
    link VARCHAR(255),
    duration VARCHAR(255),
    thumbnail_url VARCHAR(255)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    discord_username VARCHAR(255),
    discord_id VARCHAR(255),
    twitch_username VARCHAR(255)
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