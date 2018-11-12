const c_Music = [
  {name: "Play <Search>", value: "Plays request"},
  {name: "Pause", value: "Pauses music"},
  {name: "Resume", value: "Resumes music"},
  {name: "Volume [Desired Volume]", value: "Displays current volume or sets volume"},
  {name: "Skip", value: "Skips to next song in queue"},
  {name: "Stop", value: "Stops and clears the queue"},
  {name: "PlayNext <Search>", value: "Requests a song to play next in queue"},
  {name: "Playlist [Playlist]", value: "Displays available playlists or requests your Playlist to the queue"},
  {name: "Queue", value: "Displays the queue"},
  {name: "Delsong <Queue Value>", value: "Deletes a song from the queue"},
  {name: "Promote <Queue Value>", value: "Promotes a song to next in queue"},
  {name: "NP", value: "Displays the Current Song"},
  {name: "Clear", value: "Clears the current queue"}
];


const c_Currency = [
  {name: "Balance", value: "Displays currenct balance for Server"},
  {name: "Give <@Desired Recipient> <Amount>", value: "Gives a currency amount to desired recipient, from your balance"}
];

const c_Fun = [
  {name: "Pokemon [Name / Numer]", value: "Displays a random or specific Pokemon"},
  {name: "8ball <Question>"}
];
const help = [
  {title: "Music", fields: c_Music},
  {title: "Currency", fields: c_Currency},
  {title: "Fun", fields: c_Fun}
];

module.exports = help;
