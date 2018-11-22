import React, { Component } from 'react';
import './CommandDocs.css';

//Component Imports
import MusicCommands from './MusicCommands/MusicCommands';
import CurrencyCommands from './CurrencyCommands/CurrencyCommands';
import FunCommands from './FunCommands/FunCommands';

class CommandDocs extends Component {

  render() {
    return(
      <div id="CommandDocs">
        <div className="CommandDocs-Contents">
          <h1>Commands</h1>
          <div className="Music">
            <h4>Music</h4>
            <MusicCommands />
          </div>
          <div className="CurrencyCommands">
            <h4>Currency Commands</h4>
            <CurrencyCommands />
          </div>
          <div className="FunCommands">
            <h4>Fun Commands</h4>
            <FunCommands />
          </div>

          <div className="">
          </div>
        </div>
      </div>
    );
  }
};

export default CommandDocs;
