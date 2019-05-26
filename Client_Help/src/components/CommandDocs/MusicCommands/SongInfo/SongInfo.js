import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SongInfo.css';

//Image Imports
import SongInfoImage from '../../../../res/images/HelpDocsImages/SongInfo.png';

class SongInfo extends Component {

    render() {
        return(
            <div id="SongInfo">
                <div className="SongInfo-Contents">
                    <Link to="/commands/songinfo"><h3 className="SongInfo-Header">SongInfo</h3></Link>
                    <h4 className="SongInfo-SubHeader">[param]</h4>
                    <p className="SongInfo-Subheader-Param">Search Request</p>
                    <br />
                    <br />
                    <p className="SongInfo-Desc">Search for info about a song directly or use the command standalone to get the info for the current song in queue</p>
                    <img className="CommandImage" src={SongInfoImage} alt="" />
                </div>
            </div>
        );
    }
};

export default SongInfo;