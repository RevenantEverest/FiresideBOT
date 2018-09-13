INSERT INTO users (username, password) VALUES(
  'stefischer',
  '1234'
);

INSERT INTO user_settings (user_id, prefix) VALUES(
  1,
  '?'
);

INSERT INTO default_commands (status, command, description) VALUES(
  't',
  'ping',
  'Bot responds with Pong'
),(
  't',
  'play',
  'Request text or a YouTube link and FiresideBOT joins your Voice Channel and plays that song'
),(
  't',
  'skip',
  'Skips to the next song in queue'
),(
  't',
  'stop',
  'Disconnects FiresideBOT from your channel and removes all songs from queue'
),(
  't',
  'queue',
  'Displays the current queue'
),(
  't',
  'playlist',
  'When given the desired playlist name FiresideBOT adds it to the queue'
),(
  't',
  'currentsong',
  'Displayed the current song'
),(
  't',
  'delsong',
  'When given a number in queue FiresideBOT removes that song from the queue'
),(
  't',
  'newpoll',
  'Creates a new poll but requires a name for the poll'
),(
  't',
  'pollanswer',
  'Creates an available answer for the poll but requires a answer name'
),(
  't',
  'sendpoll',
  'Displays the current poll'
),(
  't',
  'vote',
  'Casts your vote to the current poll but requires a numberic value associated with the poll answer'
);
