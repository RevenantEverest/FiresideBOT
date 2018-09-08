DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS playlists;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE playlists (
  user_id INT,
  playlist_id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE playlist_songs (
  playlist_id INT,
  song_name VARCHAR(255),
  link VARCHAR(255)
);
