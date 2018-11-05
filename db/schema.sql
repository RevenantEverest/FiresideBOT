DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS guild_settings;
DROP TABLE IF EXISTS bot_guilds;
DROP TABLE IF EXISTS twitch_queue;
DROP TABLE IF EXISTS user_playlists;
DROP TABLE IF EXISTS guild_playlists;
DROP TABLE IF EXISTS guild_songs;
DROP TABLE IF EXISTS user_songs;
DROP TABLE IF EXISTS autodj;
DROP TABLE IF EXISTS default_commands;
DROP TABLE IF EXISTS custom_commands;
DROP TABLE IF EXISTS twitch_banned_words;
DROP TABLE IF EXISTS regulars;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  discord_username VARCHAR(255),
  discord_id BIGINT,
  twitch_username VARCHAR(255)
);

CREATE TABLE guild_settings (
  guild_id BIGINT,
  prefix VARCHAR(10)
);

CREATE TABLE bot_guilds (
  guild_name VARCHAR(255),
  guild_id BIGINT
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
  link VARCHAR(255),
  duration VARCHAR(255)
);

CREATE TABLE guild_playlists (
  playlist_id SERIAL PRIMARY KEY,
  guild_id BIGINT,
  guild_name VARCHAR(255),
  name VARCHAR(255)
);

CREATE TABLE guild_songs (
  song_id SERIAL PRIMARY KEY,
  playlist_id BIGINT,
  title VARCHAR(255),
  link VARCHAR(255),
  duration VARCHAR(255)
);

CREATE TABLE autodj (
  id SERIAL PRIMARY KEY,
  user_id INT,
  redirect VARCHAR(1),
  guild_id BIGINT
);

CREATE TABLE twitch_queue (
  id SERIAL PRIMARY KEY,
  channel VARCHAR(255),
  title VARCHAR(255),
  link VARCHAR(255),
  duration VARCHAR(255)
);

CREATE TABLE default_commands (
  command_id SERIAL PRIMARY KEY,
  status VARCHAR(1),
  command VARCHAR(255),
  description VARCHAR(255)
);


CREATE TABLE custom_commands (
  command_id SERIAL PRIMARY KEY,
  user_id BIGINT,
  command VARCHAR(255),
  output VARCHAR(255)
);

CREATE TABLE twitch_banned_words (
  banned_word_id SERIAL PRIMARY KEY,
  channel VARCHAR(255),
  banned_word VARCHAR(255)
);

CREATE TABLE regulars (
  regular_id SERIAL PRIMARY KEY,
  channel VARCHAR(255),
  regular_username VARCHAR(255)
);
