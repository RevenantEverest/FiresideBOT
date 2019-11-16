import React, { Component } from 'react';
import './CommandDocs.css';

//Component Imports
import MusicCommands from './MusicCommands/MusicCommands';
import CurrencyCommands from './CurrencyCommands/CurrencyCommands';
import FunCommands from './FunCommands/FunCommands';
import InfoCommands from './InfoCommands/InfoCommands';

class CommandDocs extends Component {

  render() {
    return(
      <div id="CommandDocs">
        <div className="CommandDocs-Contents">
          <h1 className="CommandDocs-Header">Commands</h1>
          <p className="CommandDocs-SubHeader">
            <a id="CommandDocs-QuickNav-Music" href="#MusicCommands">Music Commands</a>
             ||
            <a id="CommandDocs-QuickNav-Currency" href="#CurrencyCommands">Currency Commands</a>
             ||
            <a id="CommandDocs-QuickNav-Fun" href="#FunCommands">Fun Commands</a>
             ||
            <a id="CommandDocs-QuickNav-Info" href="#InfoCommands">Info Commands</a>
          </p>
          <div id="MusicCommands">
            <MusicCommands />
          </div>
          <div id="CurrencyCommands">
            <CurrencyCommands />
          </div>
          <div id="FunCommands">
            <FunCommands />
          </div>
          <div id="InfoCommands">
            <InfoCommands />
          </div>

          <div className="">
          </div>
        </div>
      </div>
    );
  }
};

export default CommandDocs;
