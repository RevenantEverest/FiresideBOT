import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Lyrics.css';

//Image Imports
import LyricsImage from '../../../../res/images/HelpDocsImages/Lyrics.png';

class Lyrics extends Component {

    render() {
        return(
            <div id="Lyrics">
                <div className="Lyrics-Contents">
                    <Link to="/commands/lyrics"><h3 className="Lyrics-Header">Lyrics</h3></Link>
                    <h4 className="Lyrics-SubHeader">[param]</h4>
                    <p className="Lyrics-Subheader-Param">Search Request</p>
                    <br />
                    <br />
                    <p className="Lyrics-Desc">Search for a songs lyrics directly or use the command standalone to get the lyrics for the current song in queue</p>
                    <img className="CommandImage" src={LyricsImage} alt="" />
                </div>
            </div>
        );
    }
};

export default Lyrics;