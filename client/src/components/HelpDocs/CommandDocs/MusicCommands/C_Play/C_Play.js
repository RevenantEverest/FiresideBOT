import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './C_Play.css';

//Image Imports
import PlayImage from '../../../../../res/images/HelpDocsImages/Play.png';

class C_Play extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="C_Play">
        <div className="C_Play-Contents">
          <Link to="/help/commands/play"><h3 className="C_Play-Header">Play</h3></Link>
          <h4 className="C_Play-SubHeader"> {this._BracketA}param{this._BracketB}</h4>
          <p className="C_Play-SubHeader-Param">Play takes in a required param of a YouTube link or search request and you must be in a voice channel to use this command</p>
          <br />
          <br />
          <p className="C_Play-Desc">If no current queue, FiresideBOT joins your voice channel, sets up and plays your request. Play can also be used to request new songs to the queue. All requests will be added to the end of the queue.</p>
          <img className="CommandImage" src={PlayImage} alt="" />
        </div>
      </div>
    );
  }
};

export default C_Play;
