import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import UserInfoImage from '../../../../res/images/HelpDocsImages/UserInfo.png';

class UserInfo extends Component {

    render() {
        return(
            <div id="UserInfo">
                <div className="UserInfo-Contents">
                    <Link to="/commands/UserInfo"><h3 className="UserInfo-Header">UserInfo</h3></Link>
                    <br />
                    <br />
                    <p className="UserInfo-Desc">Displays relevant user info</p>
                    <img className="CommandImage" src={UserInfoImage} alt="" />
                    <br />
                    <br />
                    <br />
                    <AliasTable tableData={[{alias: 'ui'}]} />
                </div>
            </div>
        );
    }
};

export default UserInfo;