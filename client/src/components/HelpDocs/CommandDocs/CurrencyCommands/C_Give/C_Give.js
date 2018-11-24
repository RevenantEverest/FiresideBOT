import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Give.css';

//Image Imports
import GiveImage from '../../../../../res/images/HelpDocsImages/Give.png';

class C_Give extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="C_Give">
        <div className="C_Give">
          <Link to="/help/commands/give"><h3 className="C_Give-Header">Give</h3></Link>
          <h4 className="C_Give-SubHeader">{this._BracketA}param{this._BracketB}</h4>
          <p className="C_Give-SubHeader-Param">Give takes in a required parameter of a tag of someone in the server you wish to give points to and how many points you want to give</p>
          <br />
          <br />
          <p className="C_Give-Desc">Removes the points declared to give and gives them to who was specified. You can't give more points than you have.</p>
          <img id="Give-ImageA" className="CommandImage" src={GiveImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Give;
