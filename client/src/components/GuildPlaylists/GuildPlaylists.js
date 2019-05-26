import React, { Component } from 'react';
import './GuildPlaylists.css';

class GuildPlaylists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
    }

    render() {
        return(
            <div id="GuildPlaylists">
            </div>
        );
    }
};

export default GuildPlaylists;