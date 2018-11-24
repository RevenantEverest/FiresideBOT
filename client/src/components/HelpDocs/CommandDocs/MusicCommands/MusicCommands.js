import React, { Component } from 'react';
import './MusicCommands.css';

//Component Imports
import Clear from './C_Clear/C_Clear';
import Delsong from './C_Delsong/C_Delsong';
import NP from './C_NP/C_NP';
import Pause from './C_Pause/C_Pause';
import Play from './C_Play/C_Play';
import Playlist from './C_Playlist/C_Playlist';
import PlayNext from './C_PlayNext/C_PlayNext';
import Promote from './C_Promote/C_Promote';
import Queue from './C_Queue/C_Queue';
import Resume from './C_Resume/C_Resume';
import Skip from './C_Skip/C_Skip';
import Stop from './C_Stop/C_Stop';
import Volume from './C_Volume/C_Volume';

class MusicCommands extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="MusicCommandDocs">
        <div className="MusicCommands-Contents">
          <h1 className="MusicCommands-Header">Music Commands</h1>
          <br />
          <p className="MusicCommands-SubHeader MusicCommands-SubHeader-ParamA">{this._BracketA}param{this._BracketB}</p>
          <p className="MusicCommands-SubHeader">indicated a required parameter while </p>
          <p className="MusicCommands-SubHeader MusicCommands-SubHeader-ParamB">[param]</p>
          <p className="MusicCommands-SubHeader"> indicates an optional parameter</p>
          <Clear />
          <Delsong />
          <NP />
          <Pause />
          <Play />
          <Playlist />
          <PlayNext />
          <Promote />
          <Queue />
          <Resume />
          <Skip />
          <Stop />
          <Volume />
        </div>
      </div>
    );
  }
};

export default MusicCommands;
