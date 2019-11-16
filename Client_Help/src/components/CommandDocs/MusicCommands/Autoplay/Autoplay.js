import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Autoplay.css';

//Image Imports
import AutoplayImage from '../../../../res/images/HelpDocsImages/AutoPlay.png'

class Autoplay extends Component {

    render() {
        return(
            <div id="Autoplay">
                <div className="Autoplay-Contents">
                    <Link to="/commands/autoplay"><h3 className="Autoplay-Header">Autoplay</h3></Link>
                    <br />
                    <br />
                    <p className="Autoplay-Desc">Toggles Autoplay (Recommendations) on or off. For more info see <Link to="/commands/musicoptions">MusicOptions</Link></p>
                    <img className="CommandImage" src={AutoplayImage} alt="" />
                </div>
            </div>
        );
    }
};

export default Autoplay;