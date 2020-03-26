DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_playlists;
DROP TABLE IF EXISTS user_songs;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    discord_username VARCHAR(255),
    discord_id VARCHAR(255),
    twitch_username VARCHAR(255)
);

CREATE TABLE user_playlists (
    playlist_id SERIAL PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR(255)
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