import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_PlayNext.css';

//Image Imports
import PlayNextImage from '../../../../../res/images/HelpDocsImages/PlayNext.png';

class C_PlayNext extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="C_PlayNext">
      <div className="C_PlayNext-Contents">
          <Link to="/help/commands/playnext"><h3 className="C_PlayNext-Header">PlayNext</h3></Link>
          <h4 className="C_PlayNext-SubHeader"> {this._BracketA}param{this._BracketB}</h4>
          <p className="C_PlayNext-SubHeader-Param">PlayNext takes in a required paramater of a YouTube link or search request</p>
          <br />
          <br />
          <p className="C_PlayNext-Desc">Unlike the Play command, PlayNext adds your request to play next in queue.</p>
          <img id="PlayNext-Image" className="CommandImage" src={PlayNextImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_PlayNext;
