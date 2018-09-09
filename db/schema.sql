DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS songs;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE playlists (
  playlist_id SERIAL PRIMARY KEY,
  user_id INT,
  name VARCHAR(255)
);

CREATE TABLE songs (
  song_id SERIAL PRIMARY KEY,
  playlist_id INT,
  song_name VARCHAR(255),
  link VARCHAR(255)
);
