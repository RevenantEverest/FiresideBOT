DROP TABLE IF EXISTS role_reactions;

CREATE TABLE role_reactions (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(255),
    message_id VARCHAR(255),
    channel_id VARCHAR(255),
    role_id VARCHAR(255),
    emoji_id VARCHAR(255),
    title VARCHAR(1024),
    description VARCHAR(1024)
);