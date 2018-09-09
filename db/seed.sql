INSERT INTO users (username, password) VALUES(
  'stefischer',
  '1234'
);


INSERT INTO playlists (user_id, name) VALUES(
  1,
  'test'
);

INSERT INTO songs (playlist_id, song_name, link) VALUES(
  1,
  'Dark Of You',
  'https://www.youtube.com/watch?v=LrkMczxtmS4'
), (
  1,
  'Torn In Two',
  'https://www.youtube.com/watch?v=sn3Ct2_L4OA'
), (
  1,
  'Burden',
  'https://www.youtube.com/watch?v=fbZO6UBtYTg'
);
