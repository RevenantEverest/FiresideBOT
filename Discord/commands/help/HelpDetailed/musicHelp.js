const Play = [
  {name: "Description", value: "Plays a search request"},
  {name: "Example", value: "`?Play Burden Subtact and Jay Rodger`"},
];
const Pause = [
  {name: "Description", value: "Displays the current song"},
  {name: "Example", value: "`?Pause`"},
];
const Resume = [
  {name: "Description", value: "Displays the current song"},
  {name: "Example", value: "`?Resume`"},
];
const Volume = [
  {name: "Description", value: "Displays the current Volume or sets desired Volume"},
  {name: "Example", value: "`?volume 20`"},
];
const Skip = [
  {name: "Description", value: "Skips to next song in queue. If no other songs in queue, acts as `Stop` command"},
  {name: "Example", value: "`?Skip`"},
];
const Stop = [
  {name: "Description", value: "Stops the current song, clears the queue and removes the bot from the voice channel"},
  {name: "Example", value: "`?Stop`"},
];
const PlayNext = [
  {name: "Description", value: "Adds your request next in queue"},
  {name: "Example", value: "`?PlayNext Illenium Feels Good`"},
];
const Playlist = [
  {name: "Description", value: "Displays available user Playlists that can be created [here](https://www.google.com)"},
  {name: "Example", value: "`?Playlist Chillstep`"},
  {name: "Flags", value: "`-s`: Adding `-s` to your Playlist request will shuffle the playlist before adding it to the queue"}
];
const Queue = [
  {name: "Description", value: "Displays the current queue"},
  {name: "Example", value: "`?Queue`"},
];
const Delsong = [
  {name: "Description", value: "Dletes a song from queue"},
  {name: "Example", value: "`?Delsong 10`"},
];
const Promote = [
  {name: "Description", value: "Promotes a song to next in queue"},
  {name: "Example", value: "`?Promote 12`"},
];
const NP = [
  {name: "Description", value: "Displays the current song"},
  {name: "Example", value: "`?NP`"},
];
const Clear = [
  {name: "Description", value: "Clears the current queue"},
  {name: "Example", value: "`?Clear`"}
];

const Music_Help = [
  {command: "play", fields: Play},
  {command: "pause", fields: Pause},
  {command: "resume", fields: Resume},
  {command: "volume", fields: Volume},
  {command: "skip", fields: Skip},
  {command: "stop", fields: Stop},
  {command: "playnext", fields: PlayNext},
  {command: "playlist", fields: Playlist},
  {command: "queue", fields: Queue},
  {command: "delsong", fields: Delsong},
  {command: "promote", fields: Promote},
  {command: "np", fields: NP},
  {command: "clear", fields: Clear}
];

module.exports = Music_Help;
