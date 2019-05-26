import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BotInfo.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import BotInfoImage from '../../../../res/images/HelpDocsImages/BotInfo.png';

class BotInfo extends Component {

    render() {
        return(
            <div id="BotInfo">
                <div className="BotInfo-Contents">
                    <Link to="/commands/botinfo"><h3 className="BotInfo-Header">BotInfo</h3></Link>
                    <br />
                    <br />
                    <p className="BotInfo-Desc">Displays relevant FiresideBOT info</p>
                    <img className="CommandImage" src={BotInfoImage} alt="" />
                    <br />
                    <br />
                    <br />
                    <AliasTable tableData={[{alias: 'stats'}, {alias: 'bi'}]} />
                </div>
            </div>
        );
    }
};

export default BotInfo;