import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Delsong.css';

//Image Imports
import DelsongImage from '../../../../../res/images/HelpDocsImages/Delsong.png';

class C_Delsong extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="C_Delsong">
        <div className="C_Delsong-Contents">
          <Link to="/help/commands/delsong"><h3 className="C_Delsong-Header">Delsong</h3></Link>
          <h4 className="C_Delsong-SubHeader"> {this._BracketA}param{this._BracketB}</h4>
          <p className="C_Delsong-SubHeader-Param">Delsong takes in a requires param of an integer value available in queue</p>
          <br />
          <br />
          <p className="C_Delsong-Desc">Removes a song from queue.</p>
          <img className="CommandImage" src={DelsongImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Delsong;
