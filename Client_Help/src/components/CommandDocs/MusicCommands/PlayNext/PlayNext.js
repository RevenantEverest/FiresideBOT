import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PlayNext.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import PlayNextImage from '../../../../res/images/HelpDocsImages/PlayNext.png';

class PlayNext extends Component {

  _BracketA = '<';
  _BracketB = '>';

  render() {
    return(
      <div id="PlayNext">
      <div className="PlayNext-Contents">
          <Link to="/commands/playnext"><h3 className="PlayNext-Header">PlayNext</h3></Link>
          <h4 className="PlayNext-SubHeader"> {this._BracketA}param{this._BracketB}</h4>
          <p className="PlayNext-SubHeader-Param">PlayNext takes in a required paramater of a YouTube link or search request</p>
          <br />
          <br />
          <p className="PlayNext-Desc">Unlike the Play command, PlayNext adds your request to play next in queue.</p>
          <img id="PlayNext-Image" className="CommandImage" src={PlayNextImage} alt="" />
          <br />
          <br />
          <br />
          <AliasTable tableData={[{alias: 'pn'}]} />
        </div>
      </div>
    );
  }
};

export default PlayNext;
