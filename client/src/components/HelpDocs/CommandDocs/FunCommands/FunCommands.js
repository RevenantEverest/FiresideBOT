import React, { Component } from 'react';
import './FunCommands.css';

//Component Imports
import EightBall from './C_EightBall/C_EightBall';
import Pokemon from './C_Pokemon/C_Pokemon';

class FunCommands extends Component {

  render() {
    return(
      <div id="FunCommands">
        <div className="FunCommands-Contents">
          <h3>Fun Commands</h3>
          <EightBall />
          <Pokemon />
        </div>
      </div>
    );
  }
};

export default FunCommands;
