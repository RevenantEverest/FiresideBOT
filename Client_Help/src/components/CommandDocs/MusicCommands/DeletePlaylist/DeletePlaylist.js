import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DeletePlaylist.css';

//Component Imports
import AliasTable from '../../Aliases/AliasTable/AliasTable';

//Image Imports
import DeletePlaylistImage from '../../../../res/images/HelpDocsImages/DeletePlaylist.png';

class DeletePlaylist extends Component {

    _BracketA = '<';
    _BracketB = '>';

    render() {
        return(
            <div id="DeletePlaylist">
                <div className="DeletePlaylist-Contents">
                    <Link to="/commands/deleteplaylist"><h3 className="DeletePlaylist-Header">DeletePlaylist</h3></Link>
                    <h4 className="DeletePlaylist-SubHeader">{this._BracketA}param{this._BracketB}</h4>
                    <p className="DeletePlaylist-Subheader-Param">Playlist Name</p>
                    <br />
                    <br />
                    <p className="DeletePlaylist-Desc">Deletes a Playlist</p>
                    <img className="CommandImage" src={DeletePlaylistImage} alt="" />
                    <br />
                    <br />
                    <br />
                    <AliasTable tableData={[{alias: 'dp'}, {alias: 'delplaylist'}, {alias: 'delplay'}]} />
                </div>
            </div>
        );
    }
};

export default DeletePlaylist;