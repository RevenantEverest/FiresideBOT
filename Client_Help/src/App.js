import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

//Component Imports
import HelpNavBar from './components/HelpNavBar/HelpNavBar';
import WhatsNew from './components/WhatsNew/WhatsNew';
import GettingStarted from './components/GettingStarted/GettingStarted';
import ControlPanelDocs from './components/ControlPanelDocs/ControlPanelDocs';
import CommandDocs from './components/CommandDocs/CommandDocs';

import JoinServer from './components/GettingStarted/JoinServer/JoinServer';

import AnalyticsDocs from './components/ControlPanelDocs/AnalyticsDocs/AnalyticsDocs';
import AutoDJDocs from './components/ControlPanelDocs/AutoDJDocs/AutoDJDocs';
import CurrencyDocs from './components/ControlPanelDocs/CurrencyDocs/CurrencyDocs';
import CustomCommandDocs from './components/ControlPanelDocs/CustomCommandDocs/CustomCommandDocs';
import DashboardDocs from './components/ControlPanelDocs/DashboardDocs/DashboardDocs';
import GuildPlaylistDocs from './components/ControlPanelDocs/GuildPlaylistDocs/GuildPlaylistDocs';
import ModerationDocs from './components/ControlPanelDocs/ModerationDocs/ModerationDocs';
import PersonalPlaylistDocs from './components/ControlPanelDocs/PersonalPlaylistDocs/PersonalPlaylistDocs';
import RankDocs from './components/ControlPanelDocs/RankDocs/RankDocs';
import RegularDocs from './components/ControlPanelDocs/RegularDocs/RegularDocs';

import Aliases from './components/CommandDocs/Aliases/Aliases';
import Flags from './components/CommandDocs/Flags/Flags';
import MusicCommands from './components/CommandDocs/MusicCommands/MusicCommands';
import CurrencyCommands from './components/CommandDocs/CurrencyCommands/CurrencyCommands';
import FunCommands from './components/CommandDocs/FunCommands/FunCommands';
import InfoCommands from './components/CommandDocs/InfoCommands/InfoCommands';

import AddSong from './components/CommandDocs/MusicCommands/AddSong/AddSong'
import Autoplay from './components/CommandDocs/MusicCommands/Autoplay/Autoplay'
import Clear from './components/CommandDocs/MusicCommands/Clear/Clear';
import CreatePlaylist from './components/CommandDocs/MusicCommands/CreatePlaylist/CreatePlaylist'
import DeletePlaylist from './components/CommandDocs/MusicCommands/DeletePlaylist/DeletePlaylist'
import Delsong from './components/CommandDocs/MusicCommands/Delsong/Delsong';
import Loop from './components/CommandDocs/MusicCommands/Loop/Loop'
import Lyrics from './components/CommandDocs/MusicCommands/Lyrics/Lyrics'
import MusicOptions from './components/CommandDocs/MusicCommands/MusicOptions/MusicOptions'
import NP from './components/CommandDocs/MusicCommands/NP/NP';
import Pause from './components/CommandDocs/MusicCommands/Pause/Pause';
import Play from './components/CommandDocs/MusicCommands/Play/Play';
import Playlist from './components/CommandDocs/MusicCommands/Playlist/Playlist';
import PlayNext from './components/CommandDocs/MusicCommands/PlayNext/PlayNext';
import Promote from './components/CommandDocs/MusicCommands/Promote/Promote';
import Queue from './components/CommandDocs/MusicCommands/Queue/Queue';
import RemoveSong from './components/CommandDocs/MusicCommands/RemoveSong/RemoveSong'
import Resume from './components/CommandDocs/MusicCommands/Resume/Resume';
import Skip from './components/CommandDocs/MusicCommands/Skip/Skip';
import SongInfo from './components/CommandDocs/MusicCommands/SongInfo/SongInfo'
import Stop from './components/CommandDocs/MusicCommands/Stop/Stop';
import Volume from './components/CommandDocs/MusicCommands/Volume/Volume';

import Balance from './components/CommandDocs/CurrencyCommands/Balance/Balance';
import Give from './components/CommandDocs/CurrencyCommands/Give/Give';

import EightBall from './components/CommandDocs/FunCommands/EightBall/EightBall';
import Pokemon from './components/CommandDocs/FunCommands/Pokemon/Pokemon';
import Roll from './components/CommandDocs/FunCommands/Roll/Roll';

import BotInfo from './components/CommandDocs/InfoCommands/BotInfo/BotInfo';
import ServerInfo from './components/CommandDocs/InfoCommands/ServerInfo/ServerInfo';
import UserInfo from './components/CommandDocs/InfoCommands/UserInfo/UserInfo';
import Weather from './components/CommandDocs/InfoCommands/Weather/Weather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="App-Contents">
            <div id="HelpDocs">
            <HelpNavBar />
              <div className="HelpDocs-Contents">
                <Route exact path="/whatsnew" component={WhatsNew} />
                <Route exact path="/" component={GettingStarted} />
                <Route exact path="/controlpanel" component={ControlPanelDocs} />
                <Route exact path="/commands" component={CommandDocs} />

                {/* Getting Started */}
                <Route exact path="/join" component={JoinServer} />

                {/* Control Panel */}
                <Route exact path="/controlpanel/analytics" component={AnalyticsDocs} />
                <Route exact path="/controlpanel/autodj" component={AutoDJDocs} />
                <Route exact path="/controlpanel/currency" component={CurrencyDocs} />
                <Route exact path="/controlpanel/customcommands" component={CustomCommandDocs} />
                <Route exact path="/controlpanel/dashboard" component={DashboardDocs} />
                <Route exact path="/controlpanel/guildplaylists" component={GuildPlaylistDocs} />
                <Route exact path="/controlpanel/moderation" component={ModerationDocs} />
                <Route exact path="/controlpanel/personalplaylists" component={PersonalPlaylistDocs} />
                <Route exact path="/controlpanel/ranks" component={RankDocs} />
                <Route exact path="/controlpanel/regulars" component={RegularDocs} />

                {/* Sub Categories */}
                <Route exact path="/commands/aliases" component={Aliases} />
                <Route exact path="/commands/flags" component={Flags} />
                <Route exact path="/commands/music" component={MusicCommands} />
                <Route exact path="/commands/currency" component={CurrencyCommands} />
                <Route exact path="/commands/fun" component={FunCommands} />
                <Route exact path="/commands/info" component={InfoCommands} />

                {/* Single Commands */}
                <Route exact path="/commands/addsong" component={AddSong} />
                <Route exact path="/commands/autoplay" component={Autoplay} />
                <Route exact path="/commands/clear" component={Clear} />
                <Route exact path="/commands/createplaylist" component={CreatePlaylist} />
                <Route exact path="/commands/deleteplaylist" component={DeletePlaylist} />
                <Route exact path="/commands/delsong" component={Delsong} />
                <Route exact path="/commands/loop" component={Loop} />
                <Route exact path="/commands/lyrics" component={Lyrics} />
                <Route exact path="/commands/musicoptions" component={MusicOptions} />
                <Route exact path="/commands/np" component={NP} />
                <Route exact path="/commands/pause" component={Pause} />
                <Route exact path="/commands/play" component={Play} />
                <Route exact path="/commands/playlist" component={Playlist} />
                <Route exact path="/commands/playnext" component={PlayNext} />
                <Route exact path="/commands/promote" component={Promote} />
                <Route exact path="/commands/queue" component={Queue} />
                <Route exact path="/commands/removesong" component={RemoveSong} />
                <Route exact path="/commands/resume" component={Resume} />
                <Route exact path="/commands/skip" component={Skip} />
                <Route exact path="/commands/songinfo" component={SongInfo} />
                <Route exact path="/commands/stop" component={Stop} />
                <Route exact path="commands/volume" component={Volume} />

                <Route exact path="/commands/balance" component={Balance} />
                <Route exact path="/commands/give" component={Give} />

                <Route exact path="/commands/8ball" component={EightBall} />
                <Route exact path="/commands/pokemon" component={Pokemon} />
                <Route exact path="/commands/roll" component={Roll} />

                <Route exact path="/commands/botinfo" component={BotInfo} />
                <Route exact path="/commands/serverinfo" component={ServerInfo} />
                <Route exact path="/commands/userinfo" component={UserInfo} />
                <Route exact path="/commands/weather" component={Weather} />
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
