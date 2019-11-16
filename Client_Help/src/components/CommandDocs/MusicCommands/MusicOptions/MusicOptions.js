import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MusicOptions.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';
import FlagsTable from '../../Flags/FalgsTable/FlagsTable';

//Image Imports
import MusicOptionsImage from '../../../../res/images/HelpDocsImages/MusicOptions.png';
import MusicOptionsRecImage from '../../../../res/images/HelpDocsImages/MusicOptionsRec.png';
import MusicOptionsLoopImage from '../../../../res/images/HelpDocsImages/MusicOptionsLoop.png';

class MusicOptions extends Component {

    render() {
        return(
            <div id="MusicOptions">
                <div className="MusicOptions-Contents">
                    <Link to="/commands/musicoptions"><h3 className="MusicOptions-Header">MusicOptions</h3></Link>
                    <h4 className="MusicOptions-SubHeader">[param]</h4>
                    <p className="MusicOptions-Subheader-Param"></p>
                    <br />
                    <br />
                    <p className="MusicOptions-Desc">Adjust these settings to change up your listening expereicne.</p>
                    <br />
                    <br />
                    <p className="MusicOptions-Desc MusicOptions-Desc-Rec">Recommendations</p>
                    <p className="MusicOptions-Desc"> takes your most listened to genre in queue and when the queue finises requests related songs in that genre. Use the flag </p>
                    <p className="MusicOptions-Desc MusicOptions-Desc-Flag">-r</p>
                    <p className="MusicOptions-Desc"> to toggle on and off or use the command <Link to="/commands/autoplay">Autoplay</Link></p>
                    <br />
                    <br />
                    <p className="MusicOptions-Desc MusicOptions-Desc-Loop">Looping</p>
                    <p className="MusicOptions-Desc"> allows you play the current songs in queue continuously. Use the flag </p>
                    <p className="MusicOptions-Desc MusicOptions-Desc-Flag">-l</p>
                    <p className="MusicOptions-Desc"> to toggle on and off or use the command <Link to="/commands/loop">Loop</Link></p>
                    <br />
                    <br />
                    <br />
                    <img id="MusicOptions-ImageA" className="CommandImage" src={MusicOptionsImage} alt="" />
                    <img id="MusicOptions-ImageB" className="CommandImage" src={MusicOptionsRecImage} alt="" />
                    <img id="MusicOptions-ImageC" className="CommandImage" src={MusicOptionsLoopImage} alt="" />
                    <br />
                    <br />
                    <br />
                    <FlagsTable 
                        tableData={
                            [
                                {flag: '-r', desc: 'Toggles Recommendations'},
                                {flag: '-l', desc: 'Toggles Looping'}
                            ]
                        }
                    />
                    <AliasTable tableData={[{alias: 'mo'}]} />
                </div>
            </div>
        );
    }
};

export default MusicOptions;