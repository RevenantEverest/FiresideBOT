import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FunCommands.css';

//Component Imports
import EightBall from './C_EightBall/C_EightBall';
import Pokemon from './C_Pokemon/C_Pokemon';

class FunCommands extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="FunCommandDocs">
        <div className="FunCommands-Contents">
          <Link to="/help/commands/fun"><h3 className="FunCommands-Header">Fun Commands</h3></Link>
          <br />
          <p className="FunCommands-SubHeader FunCommands-SubHeader-ParamA">{this._BracketA}param{this._BracketB}</p>
          <p className="FunCommands-SubHeader">indicated a required parameter while </p>
          <p className="FunCommands-SubHeader FunCommands-SubHeader-ParamB">[param]</p>
          <p className="FunCommands-SubHeader"> indicates an optional parameter</p>
          <EightBall />
          <Pokemon />
        </div>
      </div>
    );
  }
};

export default FunCommands;
