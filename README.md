# FiresideBOT
A Music, Economy & Admin Discord Bot written in Node.js  

[HelpDocs](help.firesidebot.com) || [Invite](https://discordapp.com/oauth2/authorize?client_id=441338104545017878&response_type=code&permissions=8&scope=bot) || [Online Control Panel](firesidebot.com)

---

# Features

---

### Commands
`<param>` indicates a required parameter while `[param]` indicates an optional parameter

---

##### Admin Commands

- [Ban](help.firesidebot.com/commands/ban) `<param>`
**Desc**: Bans a user
**Param**: @Tag, Length(days) and/or reason
**Example**: `?ban @RevenantEverest 999 bad dev`

- [Config](help.firesidebot.com/commands/config) `[param]`
**Desc**: Depending on the flag provided, displays config options, updates prefix, updates currency name, or updates currency increase rate (per message)
**Param**: flag, (new prefix, new currency name, new currency increase rate)
**Flags**: `-p` `-cn` `-cir`
**Example**: `?config =cir 20`

- [Purge](help.firesidebot.com/commands/config) `[param]`
**Desc**: Purges the last 10 messages or the amount provided. If a @Tag is provided, grabs either the default amount of messages, or an amount provided, searches for the user in those messages and deletes them
**Param**: @Tag and/or Amount
**Example**: `?purge @RevenantEverest 20`

---

##### Economy Commands

- [Balance](help.firesidebot.com/commands/balance)  
**Desc**: Displays your current balance for that server  
**Aliases**: `bal`
**Example**: `?balacne`

- [Give](help.firesidebot.com/commands/give) `<Param>`  
**Desc**: Gives your desired amount of currency to another   
**Param**: Numeric Value of currency to give and a @ tag of the person to receive the currency
**Example**: `?give @RevenantEverest 20`

- [Gamble](help.firesidebot.com/commands/gamble) `<Param>`
**Desc**: Place a bet and hope for the best.
**Param**: Amount
**Example**: `?gamble 10`

---

##### Fun Commands

- [Pokemon](help.firesidebot.com/commands/pokemon) `[param]`  
**Desc**: Depending on the `params` or `flags` given will either display a random Pokemon (No params or flags), display a specific Pokemon (Given a valid Pokemon Name or Pokedex ID), display a random Pokemon with more info about that Pokemon (Given no param but the flag `-i`), or display a specific Pokemon with more info about that Pokemon (Given a valid Pokemon name or Pokedex ID with the flag `-i`)  
**Param**: Pokemon Name or Pokedex ID  
**Flags**: `-i`
**Example**: `?pokemon 776 -i`

- [EightBall](help.firesidebot.com/commands/eightball) `<param>`  
**Desc**: Responds to a yes or no style question   
**Aliases**: `8ball` `fortune`  
**Param**: Question
**Example**: `?eightball Am I a good dev?`

- [Roll](help.firesidebot.com/commands/roll) `[param]`  
**Desc**: Returns a random number from 1 to 6 by default or 1 to the given `param`  
**Aliases**: `dice`  
**Param**: Numeric Value
**Example**: `?roll 20`

---

##### Game Stat Commands

- [Apex](help.firesidebot.com/commands/apex) `<param>`
**Desc**: Displays relevant Apex stats for your most recent legend
**Params**: Username and platform
**Example**: `?apex RevenantEverest pc`

- [Fortnite](help.firesidebot.com/commands/fortnite) `<param>`
**Desc**: Displays relevant fortnite stats
**Aliases**: `fn`
**Params**: Username and platform
**Example**: `?fortnite RevenantEverest pc`

- [Overwatch](help.firesidebot.com/commands/overwatch) `<param>`
**Desc**: Displays relevant Overwatch stats
**Aliases**: `ow`
**Params**: Battletag, platform, region
**Example**: `?overwatch Revenant#11470 us pc`

---

##### Info Commands

- [BotInfo](help.firesidebot.com/commands/botinfo)  
**Desc**: Displays relevant info about FiresideBOT  
**Aliases**: `bi`
**Example**: `?botinfo`

- [Poll](help.firesidebot.com/commands/poll) `<param>`
**Desc**: Creates a new poll
**Params**: Question, Answers and / or length in minutes
**Flags**: `-q` `-a`  `-t`
**Example**: `?poll -q Is Fireside a good bot? -a Yes -a No -a Horrible -t 120`

- [Roles](help.firesidebot.com/commands/roles)
**Desc**: Displays the servers current roles
**Example**: `?roles`

- [ServerInfo](help.firesidebot.com/commands/serverinfo)  
**Desc**: Displays relevant info about the server  
**Aliases**: `si`
**Example**: `?serverinfo`

- [TwitchInfo](help.firesidebot.com/commands/twitchinfo) `<param>`
**Desc**: Displays relevant info about a streamer
**Aliases**: `ti`
**Params**: Username
**Example**: `?twitchinfo RevenantEverest`

- [UserInfo](help.firesidebot.com/commands/userinfo)  
**Desc**: Displays relevant info about the user using the command   
**Aliases**: `ui`
**Example**: `?userinfo`

- [Weather](help.firesidebot.com/commands/weather) `<param>`
**Desc**: Displays relevant Weather info 
**Params**: City Name
**Example**: `?weather New York`

---

##### Music Commands

- [AddSong](help.firesidebot.com/commands/addsong) `[param]`  
**Desc**: Adds a song to a Playlist from either a search request or the current song in Queue  
**Param**: Playlist Name and/or search request
**Example**: `?addsong Take me as you please - the story so far`

- [Autoplay](help.firesidebot.com/commands/autoplay)  
**Desc**: Toggles Autoplay (Recommendations) on or off. For more info see `MusicOptions` 
**Example**: `?autoplay`

- [Clear](help.firesidebot.com/commands/clear)  
**Desc**: Clears the queue
**Example**: `?clear`

- [CreatePlaylist](help.firesidebot.com/commands/createplaylist) `<param>`  
**Desc**: Creates a new Playlist   
**Aliases**: `cp`  
**Param**: Playlist Name (No White space)
**Example**: `?createplaylist Memes`

- [DeletePlaylist](help.firesidebot.com/commands/deleteplaylist) `<param>`  
**Desc**: Deletes a Playlist  
**Aliases**: `dp` `delplaylist` `delplay`  
**Param**: Playlist Name
**Example**: `?deleteplaylist Chillstep`

- [Delsong](help.firesidebot.com/commands/delsong) `<param>`  
**Desc**: Removes a song from the queue   
**Aliases**: `ds`  
**Param**: Numeric value of the desired songs' position in queue
**Example**: `?delsong 4`

- [Loop](help.firesidebot.com/commands/loop)  
**Desc**: Toggles queue looping. For more info see `MusicOptions`
**Example**: `?loop`

- [Lyrics](help.firesidebot.com/commands/lyrics) `[param]`  
**Desc**: Search for a songs lyrics direct or use the command standalone to get the lyrics for the current song in Queue  
**Param**: Search Request
**Example**: `?lyrics beartooth beaten in lips`

- [MusicOptions](help.firesidebot.com/commands/musicoptions)  
**Desc**: Displays the current music options. Use the available flags with this command to toggle music recommendations or queue looping   
**Aliases**: `mo`  
**Flags**: `-r` `-l`
**Example**: `?musicoptions`

- [NP](help.firesidebot.com/commands/np)  
**Desc**: Displays the current song in Queue  
**Aliases**: `currentsong` `cs` `nowplaying`
**Example**: `?np`

- [Pause](help.firesidebot.com/commands/pause)  
**Desc**: Pauses the current song
**Example**: `?pause`

- [Play](help.firesidebot.com/commands/play) `<param>`  
**Desc**: Requests a song to be added to the Queue, if no current Queue `Play` has FiresideBOT join your voice channel to play your request  
**Param**: YouTube Link or Search Request
**Example**: `?play Illenium Fractures`

- [Playlist](help.firesidebot.com/commands/playlist) `[param]`  
**Desc**: Depending on the `param` or `flag` given, `Playlist` will either display all available Playlists (No param or flag), add a playlist to the queue (Given the Playlist name), add a playlist to the queue shuffled (Given the Playlist name and the flag `-s`) or displays relevant Playlist info (Given the Playlist name with the flag `-i`)   
**Param**:  Playlist Name  
**Flags**: `-s` `-i`
**Example**: `?playlist Chillstep -i`

- [PlayNext](help.firesidebot.com/commands/playnext) `<param>`  
**Desc**: Unlike the `Play` command, `PlayNext` adds your request to play next in Queue   
**Aliases**: `pn`  
**Param**: YouTube Link or Search Request
**Example**: `?playnext Kahlid - Talk`

- [Promote](help.firesidebot.com/commands/promote) `<param>`  
**Desc**: Promotes a song in queue to play next  
**Param**: Numeric value of the desired songs' position in Queue
**Example**: `?promote 10`

- [Queue](help.firesidebot.com/commands/queue)  
**Desc**: Displays the current Queue 
**Aliases**: `q`
**Example**: `?queue`

- [RemoveSong](help.firesidebot.com/commands/removesong) `<param>`  
**Desc**: Removes a song from a Playlist using an ID obtained from the command `Playlist` with the flag `-i`  
**Aliases**: `rs`  
**Param**: ID 
**Example**: `?removesong 68`

- [Skip](help.firesidebot.com/commands/skip)  
**Desc**: Skips to the next song in Queue
**Example**: `?skip`

- [SongInfo](help.firesidebot.com/commands/songinfo) `[param]`  
**Desc**: Displays relevant song info from a search request or the current song in Queue  
**Param**: Search Request
**Example**: `?songinfo My Bad - Kahlid`

- [Stop](help.firesidebot.com/commands/stop)  
**Desc**: Clears the Queue and removes FiresideBOT from the voice channel
**Example**: `?stop`

- [Volume](help.firesidebot.com/commands/volume) `[param]`  
**Desc**: Displays the current server volume or sets the volume if given a number between 1 and 100  
**Aliases**: `vol`  
**Param**: Numeric Value
**Example**: `?volume 15`

---

##### Support Commands

- [Feedback](help.firesidebot.com/commands/feedback) `<param>`
**Desc**: Sends a message to the dev team (If you need help, open a [ticket](help.firesidebot.com/tickets) instead)
**Params**: Message
**Example**: `?feedback Thank you for making an alright bot <3`

- [Help](help.firesidebot.com/commands/help) `[param]`
**Desc**: Displays a navigatable embed seperated by categories listing all available commands. If you provide a category name or command name, it will display info about it
**Params**: Category Name or Command Name
**Example**: `?help songinfo`

- [Support](help.firesidebot.com/commands/support)
**Desc**: Sends an invite to our support server
**Example**: `?support`