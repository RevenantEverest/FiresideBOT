import React, { Component } from 'react';
import './CurrencyCommands.css';

//Component Imports
import Balance from './C_Balance/C_Balance';
import Give from './C_Give/C_Give';

class CurrencyCommands extends Component {

  render() {
    return(
      <div id="CurrencyCommands">
        <div className="CurrencyCommands-Contents">
          <h3>Currency Commands</h3>
          <Balance />
          <Give />
        </div>
      </div>
    );
  }
};

export default CurrencyCommands;
