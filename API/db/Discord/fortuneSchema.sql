DROP TABLE IF EXISTS discord_fortunes;

CREATE TABLE discord_fortunes (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    fortunes text[]
);