# FiresideBOT  
A Music, Economy, & Admin Discord Bot written in Node.js  

###### Current Version: v1.8.0  
[HelpDocs](help.firesidebot.com) || [Invite](https://discordapp.com/oauth2/authorize?client_id=441338104545017878&response_type=code&permissions=8&scope=bot) || [Online Control Panel](https://firesidebot.com)  

---  

## Table of Contents  

| Category                 | Subcategory
| -------------            |:-------------
| [Commands](#Commands)    | [Acirhia](#Acirhia), [Admin](#Admin), [Config](#Config), [Economy](#Economy), [Fun](#Fun), [GameStats](#GameStats), [Info](#Info), [Music](#Music), [Other](#Other), [Playlists](#Playlists), [Support](#Support), 

---  

# Feature Highlights  

#### User Playlists:  
- Create a playlist that spans across servers. Playlists can be public or private, and public playlists can be viewed and requested by other users  

#### Server Playlists:  
- Admins can create a server playlist which anyone in the server can request. Admins can also add Roles to that playlist allowing any server members with that role to add to the playlist.  

#### Auto Stream Poster:  
- Add you or your favorite twitch streamer to a list of "Trackers" and anytime they go live, Fireside will post it in a text channel of your choice!  

#### Ranks:  
- Create up to 20 ranks for server members to level up with, and have full control of the EXP they get and how hard it is to level up  

#### Welcome Message:  
- Add a welcome message to your server that gets sent as a DM to every new member  

#### Custom Commands:  
- Create custom commands that return any desired output!  

#### Server Logging:  
- Log all the happenings in the server, to member updates, role creation/changes and more!  

---  

### Commands  
`<param>` indicates a required parameter while `[param]` indicates an optional parameter  

---  

<a id="Acirhia"></a>  

#### Acirhia  

- [Fight](https://help.firesidebot.com/commands/fight)   
**Desc**: Begin a random encounter for an enemy in the current area  
**Aliases**:   
**Example**: `?fight`  

- [Inventory](https://help.firesidebot.com/commands/inventory)   
**Desc**: View current inventory  
**Aliases**: `inv`   
**Example**: `?inventory`  

- [MyCharacter](https://help.firesidebot.com/commands/mycharacter)   
**Desc**: View Character Stats and Equipped Items  
**Aliases**: `mc` `vc`   
**Example**: `?mycharacter`  

- [RunDungeon](https://help.firesidebot.com/commands/rundungeon)   
**Desc**: Begin a dungeon run  
**Aliases**: `rd`   
**Example**: `?rundungeon`  

- [Shop](https://help.firesidebot.com/commands/shop)   
**Desc**: View available shop items  
**Aliases**:   
**Example**: `?shop`  

- [StartAdventure](https://help.firesidebot.com/commands/startadventure)   
**Desc**: If a user doesn't have character, this command creates one. It is needed before using any other Acirhia commands without a profile  
**Aliases**: `sa` `startad`   
**Example**: `?startadventure`  

  

--- 

<a id="Admin"></a>  

#### Admin  

- [AddRank](https://help.firesidebot.com/commands/addrank) `<param>`  
**Desc**: Creates a new Rank Tier  
**Aliases**: `nr` `cr`   
**Params**: Rank Name  
**Example**: `?addrank NewRank`  

- [AutoRole](https://help.firesidebot.com/commands/autorole) `<param>`  
**Desc**: Assign a role to give new server members when they join  
**Aliases**: `ar`   
**Params**: @Role Tag  
**Example**: `?autorole @users`  

- [Ban](https://help.firesidebot.com/commands/ban) `<param>`  
**Desc**: Bans a user  
**Aliases**:   
**Params**: Tag 
 Optional Param  
**Example**: `?ban @RevenantEverest 5 His memes are low tier`  

- [Bonus](https://help.firesidebot.com/commands/bonus) `<param>`  
**Desc**: Grants bonus currency to a user  
**Aliases**:   
**Params**: User Tag / Amount  
**Flags**: `-r`   
**Example**: `?bonus @RevenantEverest 1000 -r His post in #memes made me laugh`  

- [CreateCommand](https://help.firesidebot.com/commands/createcommand) `<param>`  
**Desc**: Create a custom command  
**Aliases**: `addcom`   
**Params**: Input (Command Name) and Output (Command Response)  
**Example**: `?createcommand MyCommand This is a new command`  

- [CreateFortune](https://help.firesidebot.com/commands/createfortune) `<param>`  
**Desc**: Creates a fortune to be used in the 8ball command  
**Aliases**: `cf`   
**Params**: Fortune name  
**Example**: `?createfortune Oh? You're approaching me?`  

- [CreateNewMemberMessage](https://help.firesidebot.com/commands/createnewmembermessage) `<param>`  
**Desc**: Creates a member message to be pulled from when a new member joins  
**Aliases**: `cnmm`   
**Params**: Message  
**Example**: `?createnewmembermessage Welcome ${user} you're our ${membercount}`  

- [DeleteCommand](https://help.firesidebot.com/commands/deletecommand) `<param>`  
**Desc**: Delete a custom command  
**Aliases**: `delcom`   
**Params**: Command ID or CommandName  
**Example**: `?deletecommand MyCommand`  

- [DeleteFortune](https://help.firesidebot.com/commands/deletefortune) `<param>`  
**Desc**: Deletes a custom fortune used in the 8ball command  
**Aliases**: `df`   
**Params**: Fortune Index  
**Example**: `?deletefortune 4`  

- [DisableCommand](https://help.firesidebot.com/commands/disablecommand) `<param>`  
**Desc**: Disables a Command  
**Aliases**: `disabledcommands` `dc`   
**Params**: Command Name or Alias  
**Example**: `?disablecommand play`  

- [DisableNewMemberMessages](https://help.firesidebot.com/commands/disablenewmembermessages)   
**Desc**: Disables New Member Messages System  
**Aliases**: `dnmm`   
**Example**: `?disablenewmembermessages`  

- [DisableStreamerRole](https://help.firesidebot.com/commands/disablestreamerrole)   
**Desc**: Disables Streamer Role system that gives anyone who's streaming a role  
**Aliases**: `dsr`   
**Example**: `?disablestreamerrole`  

- [EditCommand](https://help.firesidebot.com/commands/editcommand) `<param>`  
**Desc**: Edit a custom command  
**Aliases**: `editcom`   
**Params**: Name of command to change, an updated name or an updated output  
**Flags**: `-n`   
**Example**: `?editcommand MyCommand This is my new command edit`  

- [EditRank](https://help.firesidebot.com/commands/editrank) `<param>`  
**Desc**: Change a ranks name  
**Aliases**: `er`   
**Params**: Rank ID and new Rank name  
**Example**: `?editrank 92 NewRankName`  

- [EditStreamerRole](https://help.firesidebot.com/commands/editstreamerrole) `<param>`  
**Desc**: Edits Streamer Role that is given anyone who's streaming in you server  
**Aliases**: `editsr`   
**Params**: Role Tag  
**Example**: `?editstreamerrole @isLive`  

- [EditTracker](https://help.firesidebot.com/commands/edittracker) `<param>`  
**Desc**: Edit an existing tracker  
**Aliases**: `et`   
**Params**: Flag / Tracker ID / #Channel-Tag and/or @Role Tag  
**Flags**: `-t`   
**Example**: `?edittracker -t 108 #general @everyone`  

- [EditWelcomeMessage](https://help.firesidebot.com/commands/editwelcomemessage) `<param>`  
**Desc**: Edit a welcome message that get's sent to anyone who joins the server (Also enables Welcome Message)  
**Aliases**: `ewm`   
**Params**: Message (1024 Character Limit)  
**Example**: `?editwelcomemessage Thank you for joining my server!`  

- [EnableCommand](https://help.firesidebot.com/commands/enablecommand) `<param>`  
**Desc**: Enables a Command  
**Aliases**: `ec`   
**Params**: Command Name or Alias  
**Example**: `?enablecommand play`  

- [EnableNewMemberMessages](https://help.firesidebot.com/commands/enablenewmembermessages) `<param>`  
**Desc**: Enables New Member Messages System  
**Aliases**: `enmm`   
**Params**: Text Channel Tag  
**Example**: `?enablenewmembermessages #welcome`  

- [EnableStreamerRole](https://help.firesidebot.com/commands/enablestreamerrole) `<param>`  
**Desc**: Enables Streamer Role system to give anyone who's streaming a role  
**Aliases**: `esr`   
**Params**: Role Tag  
**Example**: `?enablestreamerrole @isLive`  

- [GrantExperience](https://help.firesidebot.com/commands/grantexperience) `<param>`  
**Desc**: Gives EXP to a member  
**Aliases**: `grantexp` `gexp`   
**Params**: User Tag / Amount  
**Flags**: `-r`   
**Example**: `?grantexperience @RevenantEverest 100 -r Good vibes`  

- [Purge](https://help.firesidebot.com/commands/purge) `[param]`  
**Desc**: Bulk delete messages  
**Aliases**:   
**Params**: @Tag / Amount  
**Example**: `?purge @RevenantEverest 20`  

- [RemoveAutoRole](https://help.firesidebot.com/commands/removeautorole) `<param>`  
**Desc**: Removes set AutoRole (Also disables AutoRole)  
**Aliases**: `rar`   
**Params**: @Role Tag  
**Example**: `?autorole @users`  

- [RemoveCurrency](https://help.firesidebot.com/commands/removecurrency) `<param>`  
**Desc**: Takes away currency from a user  
**Aliases**: `rc`   
**Params**: User Tag / Amount  
**Flags**: `-r`   
**Example**: `?removecurrency @RevenantEverest 1000 -r His memes were bad`  

- [RemoveNewMemberMessage](https://help.firesidebot.com/commands/removenewmembermessage) `<param>`  
**Desc**: Removes a new member message  
**Aliases**: `rnmm`   
**Params**: Message Index  
**Example**: `?removenewmembermessage 4`  

- [RemoveRank](https://help.firesidebot.com/commands/removerank) `<param>`  
**Desc**: Removes a Rank Tier  
**Aliases**: `rr`   
**Params**: Rank ID  
**Example**: `?removerank 10`  

- [RemoveTracker](https://help.firesidebot.com/commands/removetracker) `<param>`  
**Desc**: Deletes a Tracker  
**Aliases**: `rtracker` `rt`   
**Params**: Tracker ID  
**Flags**: `-t`   
**Example**: `?removetracker -t 53`  

- [RemoveWelcomeMessage](https://help.firesidebot.com/commands/removewelcomemessage)   
**Desc**: Remove the current Welcome Message (Also disables Welcome Message)  
**Aliases**: `rwm`   
**Example**: `?removewelcomemessage`  

- [TwitchTracker](https://help.firesidebot.com/commands/twitchtracker) `<param>`  
**Desc**: Creates a tracker for a Twitch User that posts when they're live to a text channel  
**Aliases**: `tt` `ttracker`   
**Params**: Twitch Username / #Channel Tag / @Role Tag  
**Example**: `?twitchtracker RevenantEverest #bot-commands`  

- [ViewWelcomeMessage](https://help.firesidebot.com/commands/viewwelcomemessage)   
**Desc**: Get sent an example of your server's welcome message in a DM  
**Aliases**: `vwm`   
**Example**: `?viewwelcomemessage`  

- [CustomCommands](https://help.firesidebot.com/commands/customcommands)   
**Desc**: Custom Command  
**Aliases**: `customcommand` `custcom` `cc`   
**Example**: `?customcommands`  

  

--- 

<a id="Config"></a>  

#### Config  

- [Config](https://help.firesidebot.com/commands/config)   
**Desc**: Configure FiresideBOT  
**Aliases**:   
**Example**: `?config`  

- [DisableServerLogging](https://help.firesidebot.com/commands/disableserverlogging)   
**Desc**: Disable Server Logging  
**Aliases**: `dsl`   
**Example**: `?disableserverlogging`  

- [EditCurrencyName](https://help.firesidebot.com/commands/editcurrencyname) `<param>`  
**Desc**: Update server currency name  
**Aliases**: `ecn`   
**Params**: Name  
**Example**: `?editcurrencyname Souls`  

- [EditCurrencyRate](https://help.firesidebot.com/commands/editcurrencyrate) `<param>`  
**Desc**: Update server currency rate  
**Aliases**: `ecr` `ecir`   
**Params**: Number  
**Example**: `?editcurrencyrate 20`  

- [EditLogChannel](https://help.firesidebot.com/commands/editlogchannel) `<param>`  
**Desc**: Change where server logs are posted  
**Aliases**: `elc`   
**Params**: #Channel Tag  
**Example**: `?editlogchannel #bot-commands`  

- [EditPrefix](https://help.firesidebot.com/commands/editprefix) `<param>`  
**Desc**: Change prefix  
**Aliases**:   
**Params**: Desired Prefix  
**Example**: `?editprefix`  

- [EditRankChannel](https://help.firesidebot.com/commands/editrankchannel) `<param>`  
**Desc**: Update the channel Level Ups are posted in  
**Aliases**: `ercp`   
**Params**: #Channel Tag  
**Example**: `?editrank #bot-commands`  

- [EditRankComplexity](https://help.firesidebot.com/commands/editrankcomplexity) `<param>`  
**Desc**: Update server rank complexity (How hard it is to level up)  
**Aliases**: `erc`   
**Params**: Number  
**Example**: `?editrankcomplexity 10`  

- [EditRankrate](https://help.firesidebot.com/commands/editrankrate) `<param>`  
**Desc**: Update server rank rate (How much EXP is aquired per message)  
**Aliases**: `err`   
**Params**: Number  
**Example**: `?editrankrank 12`  

- [EnableServerLogging](https://help.firesidebot.com/commands/enableserverlogging) `<param>`  
**Desc**: Enable Server Logging  
**Aliases**: `esl`   
**Params**: #Channel Tag  
**Example**: `?enableserverlogging #bot-commands`  

  

--- 

<a id="Economy"></a>  

#### Economy  

- [Balance](https://help.firesidebot.com/commands/balance)   
**Desc**: Displays currenct balance for Server  
**Aliases**: `bal`   
**Example**: `?balance`  

- [Gamble](https://help.firesidebot.com/commands/gamble) `<param>`  
**Desc**: Test your luck and win big  
**Aliases**:   
**Params**: An amount to wager  
**Example**: `?gamble 10`  

- [Give](https://help.firesidebot.com/commands/give) `<param>`  
**Desc**: Gives a currency amount to desired recipient, from your balance  
**Aliases**:   
**Params**: @Mention and Amount  
**Example**: `?give @YourFavoritePerson 100`  

  

--- 

<a id="Fun"></a>  

#### Fun  

- [CutePics](https://help.firesidebot.com/commands/cutepics)   
**Desc**: Returns a random Cute Picture  
**Aliases**: `cutepic`   
**Example**: `?cutepics`  

- [DadJoke](https://help.firesidebot.com/commands/dadjoke) `[param]`  
**Desc**: Returns a random Dad Joke either as text or an image  
**Aliases**:   
**Params**: Flag  
**Flags**: `-i`   
**Example**: `?dadjoke`  

- [8Ball](https://help.firesidebot.com/commands/8ball) `<param>`  
**Desc**: Returns a Yes or No style response  
**Aliases**: `eightball` `fortune`   
**Params**: Question  
**Example**: `?8ball Am I a good developer?`  

- [Memes](https://help.firesidebot.com/commands/memes)   
**Desc**: Returns a random Meme  
**Aliases**: `meme`   
**Example**: `?memes`  

- [NSFW](https://help.firesidebot.com/commands/nsfw)   
**Desc**: Returns a random NSFW Picture  
**Aliases**:   
**Example**: `?nsfw`  

- [Pokemon](https://help.firesidebot.com/commands/pokemon) `[param]`  
**Desc**: Displays a random or specific Pokemon  
**Aliases**:   
**Params**: ID or Name  
**Flags**: `-i`   
**Example**: `?pokemon Manaphy -i`  

- [Roll](https://help.firesidebot.com/commands/roll) `[param]`  
**Desc**: Rolls any number sided dice (Default is 6)  
**Aliases**: `dice`   
**Params**: Number  
**Example**: `?roll 20`  

- [Thanos](https://help.firesidebot.com/commands/thanos)   
**Desc**: Displays a random Thanos quote  
**Aliases**:   
**Example**: `?thanos`  

- [Trivia](https://help.firesidebot.com/commands/trivia) `[param]`  
**Desc**: Starts a trivia game  
**Aliases**:   
**Params**: Number  
**Flags**: `-easy` `-medium` `-hard`   
**Example**: `?trivia 10 -medium `  

- [Vibe](https://help.firesidebot.com/commands/vibe)   
**Desc**: Checks your current vibe  
**Aliases**: `vibecheck`   
**Example**: `?vibe`  

  

--- 

<a id="GameStats"></a>  

#### GameStats  

- [Apex](https://help.firesidebot.com/commands/apex) `<param>`  
**Desc**: Displays relevant stats for your most recent Apex Legend  
**Aliases**:   
**Params**: Username, Platform  
**Example**: `?apex RevenantEverest pc`  

- [Fortnite](https://help.firesidebot.com/commands/fortnite) `<param>`  
**Desc**: Displays relevant Fortnite stats  
**Aliases**: `fn`   
**Params**: Username, Platform  
**Example**: `?fortnite RevenantEverest pc`  

- [Overwatch](https://help.firesidebot.com/commands/overwatch) `<param>`  
**Desc**: Displays relevant Competitive and Quick Play stats for Overwatch  
**Aliases**: `ow`   
**Params**: Region, Platform, Battletag  
**Example**: `?overwatch pc us Revenant#11470`  

- [RainbowSix](https://help.firesidebot.com/commands/rainbowsix) `<param>`  
**Desc**: Displays relevant stats for your most Rainbow Six account  
**Aliases**: `r6` `rainbowsix` `rainbowsix`   
**Params**: Username, Platform  
**Example**: `?rainbowsix RevenantEverest uplay`  

  

--- 

<a id="Info"></a>  

#### Info  

- [BotInfo](https://help.firesidebot.com/commands/botinfo)   
**Desc**: Displays relevant Bot info  
**Aliases**: `stats` `bi`   
**Example**: `?botinfo`  

- [Fortunes](https://help.firesidebot.com/commands/fortunes)   
**Desc**: Displays all custom fortunes  
**Aliases**:   
**Example**: `?fortunes`  

- [Leaderboard](https://help.firesidebot.com/commands/leaderboard)   
**Desc**: Displays Rank Leaderboard for server  
**Aliases**: `lb`   
**Example**: `?leaderboard`  

- [MyRank](https://help.firesidebot.com/commands/myrank)   
**Desc**: Displays current Rank and XP  
**Aliases**: `mr`   
**Example**: `?myrank`  

- [NewMemberMessages](https://help.firesidebot.com/commands/newmembermessages)   
**Desc**: Displays all New Member Messages  
**Aliases**: `nmm`   
**Example**: `?newmembermessages`  

- [Poll](https://help.firesidebot.com/commands/poll) `<param>`  
**Desc**: Creates a new Poll  
**Aliases**:   
**Params**:   
**Flags**: `-q` `-a` `-t`   
**Example**: `?poll -q How is everyone enjoying FiresideBOT? -a It's amazing -a It's okay -a Developer is bad :eyes: -t 60`  

- [PremiumStatus](https://help.firesidebot.com/commands/premiumstatus) `[param]`  
**Desc**: Check your premium status  
**Aliases**: `ps`   
**Params**: Flag  
**Flags**: `-s`   
**Example**: `?premiumstatus`  

- [RankInfo](https://help.firesidebot.com/commands/rankinfo)   
**Desc**: Displays available Rank Tier Info  
**Aliases**: `ri`   
**Example**: `?rankinfo MyRank`  

- [Ranks](https://help.firesidebot.com/commands/ranks)   
**Desc**: Displays all available Rank Tiers  
**Aliases**: `r`   
**Example**: `?ranks`  

- [Roles](https://help.firesidebot.com/commands/roles)   
**Desc**: Displays availale Roles  
**Aliases**:   
**Example**: `?roles`  

- [ServerInfo](https://help.firesidebot.com/commands/serverinfo)   
**Desc**: Displays relevant Server Info  
**Aliases**: `si`   
**Example**: `?serverinfo`  

- [Trackers](https://help.firesidebot.com/commands/trackers)   
**Desc**: Displays available Trackers  
**Aliases**:   
**Example**: `?trackers`  

- [TwitchInfo](https://help.firesidebot.com/commands/twitchinfo) `<param>`  
**Desc**: Displays relevant info about a Twitch User  
**Aliases**: `ti` `twitch`   
**Params**: Twitch Username  
**Example**: `?twitchinfo RevenantEverest`  

- [UserInfo](https://help.firesidebot.com/commands/userinfo)   
**Desc**: Displays relevant User Info  
**Aliases**: `ui`   
**Example**: `?userinfo`  

- [ViewRank](https://help.firesidebot.com/commands/viewrank) `<param>`  
**Desc**: View a users Rank  
**Aliases**: `vr`   
**Params**: @Tag  
**Example**: `?viewrank @RevenantEverest`  

- [Weather](https://help.firesidebot.com/commands/weather) `<param>`  
**Desc**: Displays the current weather for the spcified City  
**Aliases**:   
**Params**: City Name  
**Example**: `?weather New York`  

  

--- 

<a id="Music"></a>  

#### Music  

- [Autoplay](https://help.firesidebot.com/commands/autoplay)   
**Desc**: Enables or Disables music recommendations  
**Aliases**:   
**Example**: `?autoplay`  

- [Clear](https://help.firesidebot.com/commands/clear)   
**Desc**: Clears the current queue  
**Aliases**:   
**Example**: `?clear`  

- [Delsong](https://help.firesidebot.com/commands/delsong) `<param>`  
**Desc**: Deletes a song from the queue  
**Aliases**: `ds`   
**Params**: ID  
**Example**: `?delsong 4`  

- [Loop](https://help.firesidebot.com/commands/loop)   
**Desc**: Toggles queue looping  
**Aliases**:   
**Example**: `?loop`  

- [Lyrics](https://help.firesidebot.com/commands/lyrics) `[param]`  
**Desc**: Displays lyrics for a song along with relevant song info  
**Aliases**:   
**Params**: Song name  
**Example**: `?lyrics Trust in me Mr Fijiwiji`  

- [MusicOptions](https://help.firesidebot.com/commands/musicoptions) `[param]`  
**Desc**: Displays current Music Options  
**Aliases**: `mo`   
**Params**: undefined  
**Flags**: `-l` `-r`   
**Example**: `?musicoptions`  

- [NP](https://help.firesidebot.com/commands/np)   
**Desc**: Displays the Current Song  
**Aliases**: `currentsong` `nowplaying` `cs`   
**Example**: `?np`  

- [Pause](https://help.firesidebot.com/commands/pause)   
**Desc**: Pauses music  
**Aliases**:   
**Example**: `?pause`  

- [Play](https://help.firesidebot.com/commands/play) `<param>`  
**Desc**: Plays a requested YouTube Link or Search Request  
**Aliases**: `p`   
**Params**: YouTube Link or Search Request  
**Example**: `?play kingdom hearts sanctuary`  

- [PlayNext](https://help.firesidebot.com/commands/playnext) `<param>`  
**Desc**: Requests a song to play next in queue  
**Aliases**: `pn`   
**Params**: YouTube link or search  
**Example**: `?playnext bring me the horizon can you feel my heart`  

- [Promote](https://help.firesidebot.com/commands/promote) `<param>`  
**Desc**: Promotes a song to next in queue  
**Aliases**:   
**Params**: ID  
**Example**: `?promote 7`  

- [Queue](https://help.firesidebot.com/commands/queue)   
**Desc**: Displays the current queue  
**Aliases**: `q`   
**Example**: `?queue`  

- [Resume](https://help.firesidebot.com/commands/resume)   
**Desc**: Resumes any previously paused music  
**Aliases**: `unpause`   
**Example**: `?resume`  

- [Shuffle](https://help.firesidebot.com/commands/shuffle)   
**Desc**: Shuffles the current Queue  
**Aliases**:   
**Example**: `?shuffle`  

- [Skip](https://help.firesidebot.com/commands/skip)   
**Desc**: Skips to next song in queue  
**Aliases**:   
**Example**: `?skip`  

- [SongInfo](https://help.firesidebot.com/commands/songinfo) `<param>`  
**Desc**: Displays relevant info about a song  
**Aliases**:   
**Params**: Song Name  
**Example**: `?songinfo Beartooth Clever`  

- [Stop](https://help.firesidebot.com/commands/stop)   
**Desc**: Stops and clears the queue  
**Aliases**:   
**Example**: `?stop`  

- [Volume](https://help.firesidebot.com/commands/volume) `[param]`  
**Desc**: Displays current volume or sets volume  
**Aliases**: `vol`   
**Params**: Number  
**Example**: `?volume 20`  

  

--- 

<a id="Other"></a>  

#### Other  

- [Daily](https://help.firesidebot.com/commands/daily)   
**Desc**: Redeem daily rewards  
**Aliases**: `d`   
**Example**: `?daily`  

- [Emojis](https://help.firesidebot.com/commands/emojis)   
**Desc**: Displays the servers custom emojis  
**Aliases**:   
**Example**: `?emojis`  

- [Leave](https://help.firesidebot.com/commands/leave)   
**Desc**: Removes Fireside from your server  
**Aliases**:   
**Example**: `?leave`  

- [Ping](https://help.firesidebot.com/commands/ping)   
**Desc**: Pong  
**Aliases**:   
**Example**: `?ping`  

- [Uptime](https://help.firesidebot.com/commands/uptime)   
**Desc**: Uptime  
**Aliases**:   
**Example**: `?uptime`  

- [Vote](https://help.firesidebot.com/commands/vote)   
**Desc**: Displays link to Vote for Fireside on DBL, and how many votes you have stored  
**Aliases**: `votes`   
**Example**: `?vote`  

  

--- 

<a id="Playlists"></a>  

#### Playlists  

- [AddPlaylistRoles](https://help.firesidebot.com/commands/addplaylistroles) `<param>`  
**Desc**: Roles added to a server playlist, will allow members with that role to add songs to that playlist  
**Aliases**: `apr`   
**Params**: Playlist Name & @Role Tag  
**Example**: `?addplaylistroles Metal @Users`  

- [AddSong](https://help.firesidebot.com/commands/addsong) `<param>`  
**Desc**: Adds a song to your playlist from  
**Aliases**:   
**Params**: Playlist Name and/or Song Request  
**Flags**: `-s`   
**Example**: `?addsong Chillstep Better Now Post Malone`  

- [CreatePlaylist](https://help.firesidebot.com/commands/createplaylist) `<param>`  
**Desc**: Create a playlist  
**Aliases**: `cp`   
**Params**: Name  
**Flags**: `-s`   
**Example**: `?createplaylist Lo-Fi`  

- [DeletePlaylist](https://help.firesidebot.com/commands/deleteplaylist) `<param>`  
**Desc**: Deletes a Playlist  
**Aliases**: `dp` `delplaylist` `delplay`   
**Params**: Name  
**Example**: `?deleteplaylist Lo-Fi`  

- [EditPlaylist](https://help.firesidebot.com/commands/editplaylist) `<param>`  
**Desc**: Change the name of a Playlist  
**Aliases**: `ep`   
**Params**: Playlist Name & New Playlist Name or `-p` Flag  
**Flags**: `-s` `-p`   
**Example**: `?editplaylist Chillstep MyPlaylist`  

- [Playlist](https://help.firesidebot.com/commands/playlist) `[param]`  
**Desc**: Displays available playlists or requests your Playlist to the queue  
**Aliases**: `playlists`   
**Params**: Playlist Name  
**Flags**: `-i` `-s`   
**Example**: `?playlist Chillstep -s`  

- [RemovePlaylistRoles](https://help.firesidebot.com/commands/removeplaylistroles) `<param>`  
**Desc**: Removes roles added to a server playlist, will no longer allow members with that role to add songs to that playlist  
**Aliases**: `rpr`   
**Params**: Playlist Name & @Role Tag  
**Example**: `?removeplaylistroles Metal @Users`  

- [RemoveSong](https://help.firesidebot.com/commands/removesong) `<param>`  
**Desc**: Removes a song from a playlist  
**Aliases**: `rs`   
**Params**: Name / ID  
**Example**: `?removesong 189`  

- [ServerPlaylist](https://help.firesidebot.com/commands/serverplaylist) `[param]`  
**Desc**: Display or request a server playlist to be added to the queue  
**Aliases**: `sp`   
**Params**: Playlist Name  
**Flags**: `-i` `-s`   
**Example**: `?serverplaylist MyFavoriteSongs`  

  

--- 

<a id="Support"></a>  

#### Support  

- [Feedback](https://help.firesidebot.com/commands/feedback) `<param>`  
**Desc**: Submit feedback to the Fireside Dev Team  
**Aliases**:   
**Params**: Message you'd like to send as Feedback  
**Example**: `?feedback This bot could be better`  

- [Help](https://help.firesidebot.com/commands/help) `[param]`  
**Desc**: Displays Help embed  
**Aliases**:   
**Params**: Category or Command  
**Example**: `?help economy`  

- [Support](https://help.firesidebot.com/commands/support)   
**Desc**: Sends a link to the Support Discord Server  
**Aliases**:   
**Example**: `?support`  

  

--- 

