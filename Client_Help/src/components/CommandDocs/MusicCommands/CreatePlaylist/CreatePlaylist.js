import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreatePlaylist.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import CreatePlaylistImage from '../../../../res/images/HelpDocsImages/CreatePlaylist.png';

class CreatePlaylist extends Component {

    _BracketA = '<';
    _BracketB = '>';

    render() {
        return(
            <div id="CreatePlaylist">
                <div className="CreatePlaylist-Contents">
                    <Link to="/commands/createplaylist"><h3 className="CreatePlaylist-Header">CreatePlaylist</h3></Link>
                    <h4 className="CreatePlaylist-SubHeader">{this._BracketA}param{this._BracketB}</h4>
                    <p className="CreatePlaylist-Subheader-Param">Desired Playlist name (Doesn't Allow White Spaces)</p>
                    <br />
                    <br />
                    <p className="CreatePlaylist-Desc">Creates a new Playlist</p>
                    <img className="CommandImage" src={CreatePlaylistImage} alt="" />
                    <br />
                    <br />
                    <br />
                    <AliasTable tableData={[{alias: 'cp'}]} />
                </div>
            </div>
        );
    }
};

export default CreatePlaylist;