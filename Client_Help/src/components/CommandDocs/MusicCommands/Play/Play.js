import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Play.css';

//Image Imports
import PlayImage from '../../../../res/images/HelpDocsImages/Play.png';

class Play extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="Play">
        <div className="Play-Contents">
          <Link to="/commands/play"><h3 className="Play-Header">Play</h3></Link>
          <h4 className="Play-SubHeader"> {this._BracketA}param{this._BracketB}</h4>
          <p className="Play-SubHeader-Param">Play takes in a required param of a YouTube link or search request and you must be in a voice channel to use this command</p>
          <br />
          <br />
          <p className="Play-Desc">If no current queue, FiresideBOT joins your voice channel, sets up and plays your request. Play can also be used to request new songs to the queue. All requests will be added to the end of the queue.</p>
          <img className="CommandImage" src={PlayImage} alt="" />
        </div>
      </div>
    );
  }
};

export default Play;
