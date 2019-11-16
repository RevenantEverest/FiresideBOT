import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AddSong.css';

//Image Imports
import AddSongImage from '../../../../res/images/HelpDocsImages/AddSong.png';

class AddSong extends Component {

    _BracketA = '<';
    _BracketB = '>';

    render() {
        return(
            <div id="AddSong">
                <div className="AddSong-Contents">
                    <Link to="/commands/addsong"><h3 className="AddSong-Header">AddSong</h3></Link>
                    <h4 className="AddSong-SubHeader">{this._BracketA}param{this._BracketB}</h4>
                    <p className="AddSong-Subheader-Param">Playlist Name and/or Search Request</p>
                    <br />
                    <br />
                    <p className="AddSong-Desc">Adds a song to a Playlist from either a search request or the current song in queue</p>
                    <img className="CommandImage" src={AddSongImage} alt="" />
                </div>
            </div>
        );
    }
};

export default AddSong;