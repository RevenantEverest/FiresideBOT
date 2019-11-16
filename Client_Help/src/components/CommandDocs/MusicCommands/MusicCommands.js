import React, { Component } from 'react';
import './MusicCommands.css';

//Component Imports
import AddSong from './AddSong/AddSong';
import Autoplay from './Autoplay/Autoplay';
import Clear from './Clear/Clear';
import CreatePlaylist from './CreatePlaylist/CreatePlaylist';
import DeletePlaylist from './DeletePlaylist/DeletePlaylist';
import Delsong from './Delsong/Delsong';
import Loop from './Loop/Loop';
import Lyrics from './Lyrics/Lyrics';
import MusicOptions from './MusicOptions/MusicOptions';
import NP from './NP/NP';
import Pause from './Pause/Pause';
import Play from './Play/Play';
import Playlist from './Playlist/Playlist';
import PlayNext from './PlayNext/PlayNext';
import Promote from './Promote/Promote';
import Queue from './Queue/Queue';
import RemoveSong from './RemoveSong/RemoveSong';
import Resume from './Resume/Resume';
import Skip from './Skip/Skip';
import SongInfo from './SongInfo/SongInfo';
import Stop from './Stop/Stop';
import Volume from './Volume/Volume';

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
          <AddSong />
          <Autoplay />
          <Clear />
          <CreatePlaylist />
          <DeletePlaylist />
          <Delsong />
          <Loop />
          <Lyrics />
          <MusicOptions />
          <NP />
          <Pause />
          <Play />
          <Playlist />
          <PlayNext />
          <Promote />
          <Queue />
          <RemoveSong />
          <Resume />
          <Skip />
          <SongInfo />
          <Stop />
          <Volume />
        </div>
      </div>
    );
  }
};

export default MusicCommands;
