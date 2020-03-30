DROP TABLE IF EXISTS discord_banned_words;

CREATE TABLE discord_banned_words (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    banned_word VARCHAR(255),
    warning BOOLEAN,
    warning_message VARCHAR(255)
);