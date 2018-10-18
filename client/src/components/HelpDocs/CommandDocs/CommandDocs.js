import React, { Component } from 'react';
import './CommandDocs.css';

//Component Imports
import MusicCommands from './MusicCommands/MusicCommands';

class CommandDocs extends Component {

  render() {
    return(
      <div id="CommandDocs">
        <div className="CommandDocs-Contents">
          <h1>Commands</h1>
          <div className="Music">
            <h3>Music</h3>
            <MusicCommands />
          </div>

          <div className="">
          </div>
        </div>
      </div>
    );
  }
};

export default CommandDocs;
