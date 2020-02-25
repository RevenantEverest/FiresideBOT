import React, { Component } from 'react';
import './PlaylistSelect.css';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownToggle,
    MDBDropdownMenu
} from 'mdbreact';

import userPlaylistServices from '../../../services/UserServices/userPlaylistServices';
import userSongsServices from '../../../services/UserServices/userSongsServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PlaylistSelect extends Component {
    
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getUserPlaylists();
    }

    componentWillUnmount = () => this._isMounted = false;

    getUserPlaylists() {
        if(!this._isMounted) return;
        userPlaylistServices.getUserPlaylists(this.props.userData.discord_id)
        .then(playlists => {
            let songPromises = [];
            let playlistData = [];
            playlists.data.data.forEach(el => songPromises.push(userSongsServices.getPlaylistSongInfo(el.playlist_id)));
            Promise.all(songPromises).then(songs => {
                songs = songs.map((el) => el.data.data);
                songs = [].concat.apply([], songs)
                playlists.data.data.forEach(el => {
                    let songData = songs.filter(songEl => parseInt(songEl.playlist_id, 10) === el.playlist_id);
                    let overallLength = 0;
                    songData.forEach(songEl => overallLength += parseInt(songEl.duration, 10));
                    overallLength = this.timeParser(overallLength);
                    playlistData.push({ playlist_id: el.playlist_id, playlist_name: el.name, songData: songData, songCount: songData.length, overallLength: overallLength})
                })
                this.setState({ playlistData: playlistData, playlistNames: playlists.data.data.map(el => el.name), dataReceived: true });
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }

    handleChange(el) {
        this.props.getPlaylist(el);
    }

    timeParser(sec) {
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor(sec % 3600 / 60);
        let seconds = Math.floor(sec % 3600 % 60);

        let hDisplay = hours > 0 ? `${hours}:` : '';
        let mDisplay = minutes > 0 ? (minutes < 10 ? (hours > 0 ? `0${minutes}:` : `${minutes}:`) : `${minutes}:` ) : '';
        let sDisplay = seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}` ) : '';
            
        return hDisplay + mDisplay + sDisplay;
    }

    renderPlaylists() {
        let Playlists = this.state.playlistData.filter(el => el.songCount >= 1).map((el, idx) => {
            return(
                <MDBDropdownItem key={idx} onClick={() => this.handleChange(el)}>
                    <span className="PlaylistSelect-Dropdown-Item-Span">{el.playlist_name} ({el.overallLength})</span>
                    <span style={{ float: "right" }}>
                        <FontAwesomeIcon className="PlaylistSelect-Dropdown-Item-Span display-inline" icon="compact-disc" style={{ marginLeft: "-50px" }} />
                        <span className="PlaylistSelect-Dropdown-Item-Span display-inline" style={{ marginLeft: "10px" }}>{el.songCount}</span>
                    </span>
                </MDBDropdownItem>
            );
        });

        return(
            <MDBDropdown onChange={this.handleChange}>
            <MDBDropdownToggle caret color="elegant" size={this.props.nav ? "sm" : "lg"} className="PlaylistSelect-DropDown">
                Select Playlist
            </MDBDropdownToggle>
            <MDBDropdownMenu className="PlaylistSelect__DropDownMenu">
                {Playlists}
            </MDBDropdownMenu>
            </MDBDropdown>
        );
    }

    renderSpinner() {
        return(
            <MDBDropdown>
            <MDBDropdownToggle color="elegant" size="lg" className="d-none d-md-inline ServerPicker-DropDown">
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </MDBDropdownToggle>
            </MDBDropdown>
        );
    }

    render() {
        return(
            <div id="PlaylistSelect">
                <Container>
                <Row className="justify-content-md-center">
                    <Col md={"auto"}>
                    {this.state.dataReceived ? this.renderPlaylists() : this.renderSpinner()}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default PlaylistSelect;