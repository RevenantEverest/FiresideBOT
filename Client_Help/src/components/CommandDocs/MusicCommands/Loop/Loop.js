import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Loop.css';

//Image Imports
import LoopImage from '../../../../res/images/HelpDocsImages/Loop.png';

class Loop extends Component {

    render() {
        return(
            <div id="Loop">
                <div className="Loop-Contents">
                    <Link to="/commands/loop"><h3 className="Loop-Header">Loop</h3></Link>
                    <br />
                    <br />
                    <p className="Loop-Desc">Toggles queue looping. For more info see <Link to="/commands/musicoptions">MusicOptions</Link></p>
                    <img className="CommandImage" src={LoopImage} alt="" />
                </div>
            </div>
        );
    }
};

export default Loop;