import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CurrencyCommands.css';

//Component Imports
import Balance from './C_Balance/C_Balance';
import Give from './C_Give/C_Give';

class CurrencyCommands extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="CurrencyCommandDocs">
        <div className="CurrencyCommands-Contents">
          <Link to="/help/commands/currency"><h3 className="CurrencyCommands-Header">Currency Commands</h3></Link>
          <br />
          <p className="CurrencyCommands-SubHeader CurrencyCommands-SubHeader-ParamA">{this._BracketA}param{this._BracketB}</p>
          <p className="CurrencyCommands-SubHeader">indicated a required parameter while </p>
          <p className="CurrencyCommands-SubHeader CurrencyCommands-SubHeader-ParamB">[param]</p>
          <p className="CurrencyCommands-SubHeader"> indicates an optional parameter</p>
          <Balance />
          <Give />
        </div>
      </div>
    );
  }
};

export default CurrencyCommands;
