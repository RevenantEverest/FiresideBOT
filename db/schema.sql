DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS guild_settings;
DROP TABLE IF EXISTS bot_guilds;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS default_commands;
DROP TABLE IF EXISTS custom_commands;

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

CREATE TABLE playlists (
  playlist_id SERIAL PRIMARY KEY,
  user_id BIGINT,
  name VARCHAR(255)
);

CREATE TABLE songs (
  song_id SERIAL PRIMARY KEY,
  playlist_id BIGINT,
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
