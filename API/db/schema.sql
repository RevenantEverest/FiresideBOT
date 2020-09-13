DROP TABLE IF EXISTS auto_role;
DROP TABLE IF EXISTS autodj;
DROP TABLE IF EXISTS custom_commands;
DROP TABLE IF EXISTS disabled_commands;
DROP TABLE IF EXISTS regulars;
DROP TABLE IF EXISTS twitch_banned_words;
DROP TABLE IF EXISTS twitch_currency;
DROP TABLE IF EXISTS twitch_queue; 


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

CREATE TABLE custom_commands (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    created_by VARCHAR(255),
    input VARCHAR(255),
    output VARCHAR(1024),
    date VARCHAR(255)
);

CREATE TABLE new_member_messages (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    messages TEXT[],
    channel_id VARCHAR(255),
    enabled BOOLEAN
);

CREATE TABLE disabled_commands (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    command VARCHAR(255)
);

CREATE TABLE liked_songs (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255),
    title VARCHAR(255),
    author VARCHAR(255),
    link VARCHAR(255),
    duration VARCHAR(255),
    thumbnail_url VARCHAR(255),
    date VARCHAR(255)
);

CREATE TABLE music_logs (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    discord_id VARCHAR(255),
    title VARCHAR(255),
    author VARCHAR(255),
    link VARCHAR(255),
    duration VARCHAR(255),
    thumbnail_url VARCHAR(255),
    date VARCHAR(255)
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

CREATE TABLE streamer_roles (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    role_id VARCHAR(255),
    enabled BOOLEAN
);

CREATE TABLE twitch_tracker (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    twitch_username VARCHAR(255),
    twitch_id VARCHAR(255),
    channel_id VARCHAR(255),
    role_id VARCHAR(255),
    flavor_text VARCHAR(1024)
);

CREATE TABLE twitch_queue (
    id SERIAL PRIMARY KEY,
    channel VARCHAR(255),
    title VARCHAR(255),
    link VARCHAR(255),
    duration VARCHAR(255)
);

CREATE TABLE api_tokens (
    id SERIAL PRIMARY KEY,
    service VARCHAR(255),
    token VARCHAR(255),
    refresh_token VARCHAR(255),
    expires_in INT,
    date VARCHAR(255)
);

