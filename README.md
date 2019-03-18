# FiresideBOT
A Music, Economy & Admin Discord Bot written in Node.js  

[HelpDocs](help.firesidebot.com) || [Invite](https://discordapp.com/oauth2/authorize?client_id=441338104545017878&response_type=code&permissions=8&scope=bot) || [Online Control Panel](firesidebot.com)

---

# Features

---

### Commands
`<param>` indicates a required parameter while `[param]` indicates an optional parameter

---

##### Music Commands

- [AddSong](help.firesidebot.com/commands/addsong) `[param]`  
**Desc**: Adds a song to a Playlist from either a search request or the current song in Queue  
**Param**: Playlist Name and/or search request

- [Autoplay](help.firesidebot.com/commands/autoplay)  
**Desc**: Toggles Autoplay (Recommendations) on or off. For more info see `MusicOptions`  

- [Clear](help.firesidebot.com/commands/clear)  
**Desc**: Clears the queue

- [CreatePlaylist](help.firesidebot.com/commands/createplaylist) `<param>`  
**Desc**: Creates a new Playlist   
**Aliases**: `cp`  
**Param**: Playlist Name (No White space)

- [DeletePlaylist](help.firesidebot.com/commands/deleteplaylist) `<param>`  
**Desc**: Deletes a Playlist  
**Aliases**: `dp` `delplaylist` `delplay`  
**Param**: Playlist Name

- [Delsong](help.firesidebot.com/commands/delsong) `<param>`  
**Desc**: Removes a song from the queue   
**Aliases**: `ds`  
**Param**: Numeric value of the desired songs' position in queue

- [Loop](help.firesidebot.com/commands/loop)  
**Desc**: Toggles queue looping. For more info see `MusicOptions`

- [Lyrics](help.firesidebot.com/commands/lyrics) `[param]`  
**Desc**: Search for a songs lyrics direct or use the command standalone to get the lyrics for the current song in Queue  
**Param**: Search Request

- [MusicOptions](help.firesidebot.com/commands/musicoptions)  
**Desc**: Displays the current music options. Use the available flags with this command to toggle music recommendations or queue looping   
**Aliases**: `mo`  
**Flags**: `-r` `-l`

- [NP](help.firesidebot.com/commands/np)  
**Desc**: Displays the current song in Queue  
**Aliases**: `currentsong` `cs` `nowplaying`

- [Pause](help.firesidebot.com/commands/pause)  
**Desc**: Pauses the current song

- [Play](help.firesidebot.com/commands/play) `<param>`  
**Desc**: Requests a song to be added to the Queue, if no current Queue `Play` has FiresideBOT join your voice channel to play your request  
**Param**: YouTube Link or Search Request

- [Playlist](help.firesidebot.com/commands/playlist) `[param]`  
**Desc**: Depending on the `param` or `flag` given, `Playlist` will either display all available Playlists (No param or flag), add a playlist to the queue (Given the Playlist name), add a playlist to the queue shuffled (Given the Playlist name and the flag `-s`) or displays relevant Playlist info (Given the Playlist name with the flag `-i`)   
**Param**:  Playlist Name  
**Flags**: `-s` `-i`

- [PlayNext](help.firesidebot.com/commands/playnext) `<param>`  
**Desc**: Unlike the `Play` command, `PlayNext` adds your request to play next in Queue   
**Aliases**: `pn`  
**Param**: YouTube Link or Search Request

- [Promote](help.firesidebot.com/commands/promote) `<param>`  
**Desc**: Promotes a song in queue to play next  
**Param**: Numeric value of the desired songs' position in Queue

- [Queue](help.firesidebot.com/commands/queue)  
**Desc**: Displays the current Queue 
**Aliases**: `q`

- [RemoveSong](help.firesidebot.com/commands/removesong) `<param>`  
**Desc**: Removes a song from a Playlist using an ID obtained from the command `Playlist` with the flag `-i`  
**Aliases**: `rs`  
**Param**: ID 

- [Skip](help.firesidebot.com/commands/skip)  
**Desc**: Skips to the next song in Queue

- [SongInfo](help.firesidebot.com/commands/songinfo) `[param]`  
**Desc**: Displays relevant song info from a search request or the current song in Queue  
**Param**: Search Request

- [Stop](help.firesidebot.com/commands/stop)  
**Desc**: Clears the Queue and removes FiresideBOT from the voice channel 

- [Volume](help.firesidebot.com/commands/volume) `[param]`  
**Desc**: Displays the current server volume or sets the volume if given a number between 1 and 100  
**Aliases**: `vol`  
**Param**: Numeric Value

---

##### Economy Commands

- [Balance](help.firesidebot.com/commands/balance)  
**Desc**: Displays your current balance for that server  
**Aliases**: `bal`  

- [Give](help.firesidebot.com/commands/give) `<Param>`  
**Desc**: Gives your desired amount of currency to another   
**Param**: Numeric Value of currency to give and a @ tag of the person to receive the currency

---

##### Fun Commands

- [Pokemon](help.firesidebot.com/commands/pokemon) `[param]`  
**Desc**: Depending on the `params` or `flags` given will either display a random Pokemon (No params or flags), display a specific Pokemon (Given a valid Pokemon Name or Pokedex ID), display a random Pokemon with more info about that Pokemon (Given no param but the flag `-i`), or display a specific Pokemon with more info about that Pokemon (Given a valid Pokemon name or Pokedex ID with the flag `-i`)  
**Param**: Pokemon Name or Pokedex ID  
**Flags**: `-i`

- [EightBall](help.firesidebot.com/commands/eightball) `<param>`  
**Desc**: Responds to a yes or no style question   
**Aliases**: `8ball` `fortune`  
**Param**: Question

- [Roll](help.firesidebot.com/commands/roll) `[param]`  
**Desc**: Returns a random number from 1 to 6 by default or 1 to the given `param`  
**Aliases**: `dice`  
**Param**: Numeric Value

---

##### Info Commands

- [BotInfo](help.firesidebot.com/commands/botinfo)  
**Desc**: Displays relevant info about FiresideBOT  
**Aliases**: `bi`

- [ServerInfo](help.firesidebot.com/commands/serverinfo)  
**Desc**: Displays relevant info about the server  
**Aliases**: `si`

- [UserInfo](help.firesidebot.com/commands/userinfo)  
**Desc**: Displays relevant info about the user using the command   
**Aliases**: `ui`