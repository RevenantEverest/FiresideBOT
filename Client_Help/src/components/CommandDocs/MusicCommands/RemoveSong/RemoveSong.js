import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RemoveSong.css';

//Image Imports
import RemoveSongImage from '../../../../res/images/HelpDocsImages/RemoveSong.png';

class RemoveSong extends Component {

    _BracketA = '<';
    _BracketB = '>';

    render() {
        return(
            <div id="RemoveSong">
                <div className="RemoveSong-Contents">
                    <Link to="/commands/removesong"><h3 className="RemoveSong-Header">RemoveSong</h3></Link>
                    <h4 className="RemoveSong-SubHeader">{this._BracketA}param{this._BracketB}</h4>
                    <p className="RemoveSong-Subheader-Param">ID</p>
                    <br />
                    <br />
                    <p className="RemoveSong-Desc">Removes a song from a Playlist. Use the </p>
                    <p className="RemoveSong-Desc RemoveSong-Desc-Highlight">Song ID</p>
                    <p className="RemoveSong-Desc"> given by using the <Link to="/commands/playlist">Playlist</Link> command with the flag </p>
                    <p className="RemoveSong-Desc RemoveSong-Desc-Highlight">-i</p>
                    <br />
                    <br />
                    <img className="CommandImage" src={RemoveSongImage} alt="" />
                </div>
            </div>
        );
    }
};

export default RemoveSong;