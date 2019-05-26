import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ServerInfo.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import ServerInfoImage from '../../../../res/images/HelpDocsImages/ServerInfo.png';

class ServerInfo extends Component {

    render() {
        return(
            <div id="ServerInfo">
                <div className="ServerInfo-Contents">
                    <Link to="/commands/ServerInfo"><h3 className="ServerInfo-Header">ServerInfo</h3></Link>
                    <br />
                    <br />
                    <p className="ServerInfo-Desc">Displays relevant server info</p>
                    <img className="CommandImage" src={ServerInfoImage} alt="" />
                    <br />
                    <br />
                    <br />
                    <AliasTable tableData={[{alias: 'si'}]} />
                </div>
            </div>
        );
    }
};

export default ServerInfo;