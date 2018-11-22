import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './HelpDocs.css';

//Component Imports
import HelpNavBar from './HelpNavBar/HelpNavBar';
import GettingStarted from './GettingStarted/GettingStarted';
import ControlPanelDocs from './ControlPanelDocs/ControlPanelDocs';
import CommandDocs from './CommandDocs/CommandDocs';

import Flags from './GettingStarted/Flags/Flags';
import JoinServer from './GettingStarted/JoinServer/JoinServer';

import AnalyticsDocs from './ControlPanelDocs/AnalyticsDocs/AnalyticsDocs';
import AutoDJDocs from './ControlPanelDocs/AutoDJDocs/AutoDJDocs';
import CustomCommandDocs from './ControlPanelDocs/CustomCommandDocs/CustomCommandDocs';
import DashboardDocs from './ControlPanelDocs/DashboardDocs/DashboardDocs';
import GuildPlaylistDocs from './ControlPanelDocs/GuildPlaylistDocs/GuildPlaylistDocs';
import ModerationDocs from './ControlPanelDocs/ModerationDocs/ModerationDocs';
import PersonalPlaylistDocs from './ControlPanelDocs/PersonalPlaylistDocs/PersonalPlaylistDocs';
import RankDocs from './ControlPanelDocs/RankDocs/RankDocs';
import RegularDocs from './ControlPanelDocs/RegularDocs/RegularDocs';

import MusicCommands from './CommandDocs/MusicCommands/MusicCommands';
import CurrencyCommands from './CommandDocs/CurrencyCommands/CurrencyCommands';
import FunCommands from './CommandDocs/FunCommands/FunCommands';

import Clear from './CommandDocs/MusicCommands/C_Clear/C_Clear';
import Delsong from './CommandDocs/MusicCommands/C_Delsong/C_Delsong';
import NP from './CommandDocs/MusicCommands/C_NP/C_NP';
import Pause from './CommandDocs/MusicCommands/C_Pause/C_Pause';
import Play from './CommandDocs/MusicCommands/C_Play/C_Play';
import Playlist from './CommandDocs/MusicCommands/C_Playlist/C_Playlist';
import PlayNext from './CommandDocs/MusicCommands/C_PlayNext/C_PlayNext';
import Promote from './CommandDocs/MusicCommands/C_Promote/C_Promote';
import Queue from './CommandDocs/MusicCommands/C_Queue/C_Queue';
import Resume from './CommandDocs/MusicCommands/C_Resume/C_Resume';
import Skip from './CommandDocs/MusicCommands/C_Skip/C_Skip';
import Stop from './CommandDocs/MusicCommands/C_Stop/C_Stop';
import Volume from './CommandDocs/MusicCommands/C_Volume/C_Volume';

import Balance from './CommandDocs/CurrencyCommands/C_Balance/C_Balance';
import Give from './CommandDocs/CurrencyCommands/C_Give/C_Give';

import EightBall from './CommandDocs/FunCommands/C_EightBall/C_EightBall';
import Pokemon from './CommandDocs/FunCommands/C_Pokemon/C_Pokemon';


class HelpDocs extends Component {

  componentDidMount() {
    document.querySelector('.NavBar').style.display = "none";
  }

  render() {
    return(
      <div id="HelpDocs">
        <HelpNavBar />
        <div className="HelpDocs-Contents">
          <Route exact path="/help" component={GettingStarted} />
          <Route exact path="/help/controlpanel" component={ControlPanelDocs} />
          <Route exact path="/help/commands" component={CommandDocs} />

          {/* Getting Started */}
          <Route exact path="/help/join" component={JoinServer} />
          <Route exact path="/help/flags" component={Flags} />

          {/* Control Panel */}
          <Route exact path="/help/controlpanel/analytics" component={AnalyticsDocs} />
          <Route exact path="/help/controlpanel/autodj" component={AutoDJDocs} />
          <Route exact path="/help/controlpanel/customcommands" component={CustomCommandDocs} />
          <Route exact path="/help/controlpanel/dashboard" component={DashboardDocs} />
          <Route exact path="/help/controlpanel/guildplaylists" component={GuildPlaylistDocs} />
          <Route exact path="/help/controlpanel/moderation" component={ModerationDocs} />
          <Route exact path="/help/controlpanel/personalplaylist" component={PersonalPlaylistDocs} />
          <Route exact path="/help/controlpanel/rank" component={RankDocs} />
          <Route exact path="/help/controlpanel/regular" component={RegularDocs} />

          {/* Sub Categories */}
          <Route exact path="/help/commands/music" component={MusicCommands} />
          <Route exact path="/help/commands/currency" component={CurrencyCommands} />
          <Route exact path="/help/commands/fun" component={FunCommands} />

          {/* Single Commands */}
          <Route exact path="/help/commands/clear" component={Clear} />
          <Route exact path="/help/commands/delsong" component={Delsong} />
          <Route exact path="/help/commands/np" component={NP} />
          <Route exact path="/help/commands/pause" component={Pause} />
          <Route exact path="/help/commands/play" component={Play} />
          <Route exact path="/help/commands/playlist" component={Playlist} />
          <Route exact path="/help/commands/playnext" component={PlayNext} />
          <Route exact path="/help/commands/promote" component={Promote} />
          <Route exact path="/help/commands/queue" component={Queue} />
          <Route exact path="/help/commands/resume" component={Resume} />
          <Route exact path="/help/commands/skip" component={Skip} />
          <Route exact path="/help/commands/stop" component={Stop} />
          <Route exact path="/help/commands/volume" component={Volume} />

          <Route exact path="/help/commands/balance" component={Balance} />
          <Route exact path="/help/commands/give" component={Give} />

          <Route exact path="/help/commands/8ball" component={EightBall} />
          <Route exact path="/help/commands/pokemon" component={Pokemon} />
        </div>
      </div>
    );
  }
};

export default HelpDocs;
