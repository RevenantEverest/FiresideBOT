import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserPlaylists.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader
} from 'mdbreact';

//Component Imports
import AddPlaylist from '../AddPlaylist/AddPlaylist';

//Services Imports
import userPlaylistServices from '../../services/UserServices/userPlaylistServices';
import userSongsServices from '../../services/UserServices/userSongsServices';

import Skin from '../../res/Skin';

class UserPlaylists extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.getPlaylists = this.getPlaylists.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPlaylists();
    }

    componentWillUnmount = () => this._isMounted = false;

    getPlaylists() {
        if(!this._isMounted) return setTimeout(() => this.getPlaylists(), 2000);
        userPlaylistServices.getUserPlaylists(this.state.userData.discord_id)
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
                    playlistData.push({ playlist_id: el.playlist_id, playlist_name: el.name, songCount: songData.length, overallLength: overallLength})
                })
                this.setState({ playlistData: playlistData, playlistNames: playlists.data.data.map(el => el.name), dataReceived: true });
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    findModal = (index) => this.state[("modal" + index)];

    deletePlaylist(modalIndex, el) {
        userPlaylistServices.deletePlaylist(el.playlist_id)
        .then(() => {
            this.toggle(modalIndex);
            this.getPlaylists()
        })
        .catch(err => console.error(err));
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
        let Playlists = this.state.playlistData.map((el, idx) => {
            return(
                <Col key={idx} lg={4} md={4} sm={12} xs={12} style={{ marginBottom: "2%" }}>
                <MDBCard className="w-auto">
                <MDBCardBody style={{ background: "#1a1a1a" }}>
                    <MDBCardTitle>
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="headphones-alt" />
                        {el.playlist_name}
                    </MDBCardTitle>
                    <MDBCardText style={{ height: "50px", marginBottom: "2%", marginTop: "10%", color: "inherit" }}>
                    <FontAwesomeIcon style={{ marginRight: "2%" }} icon="compact-disc" />
                    {el.songCount}
                    <br />
                    <br />
                    <FontAwesomeIcon style={{ marginRight: "2%" }} icon="clock" />
                    {el.overallLength}
                    </MDBCardText>
                    <hr />
                    <Link className="UserPlaylists-ViewPlaylist" to={{
                        pathname: `/playlists/user/${el.playlist_name}`,
                        state: {
                            userData: this.props.userData,
                            manageServer: this.props.manageServer,
                            playlistData: el
                        }
                    }}>
                    <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} size="sm">
                    View Playlist
                    </MDBBtn>
                    </Link>
                    <MDBBtn color="transparent" className="UserPlaylists-Trash" size="sm" onClick={this.toggle((idx + 1))}>
                    <FontAwesomeIcon className="FontAwesomeIcon" icon="trash-alt" />
                    </MDBBtn>
                </MDBCardBody>
                </MDBCard>

                <MDBModal isOpen={this.findModal((idx + 1))} toggle={this.toggle((idx + 1))} centered>
                <MDBModalHeader toggle={this.toggle((idx + 1))} className="Modal">
                <h4 className="h4 display-inline">Are you sure you want to delete </h4>
                <h4 className="h4 display-inline" style={{ fontWeight: 600, color: "orange" }}>{el.playlist_name}</h4>
                <h4 className="h4 display-inline">?</h4>
                </MDBModalHeader>
                <MDBModalBody className="Modal">
                    <MDBBtn color="elegant" onClick={this.toggle((idx + 1))}>Close</MDBBtn>
                    <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} onClick={(e) => this.deletePlaylist((idx + 1), el)}>Delete Playlist</MDBBtn>
                </MDBModalBody>
                </MDBModal>
                </Col>
            );
        });

        return Playlists;
    }

    renderAddPlaylist() {
        return(
            <AddPlaylist 
            userData={this.state.userData} 
            manageServer={this.state.manageServer} 
            getPlaylists={this.getPlaylists} 
            playlistNames={this.state.playlistNames}
            />
        );
    }

    render() {
        return(
            <div id="UserPlaylists">
            <Container>
            <Row>
                <Col>
                    <h1 className="Component-Header">Playlists</h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: "5%" }}>
                <Col>
                    <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                    <Link to="/playlists"><p className="Component-Breadcrumb">/ Playlists </p></Link>
                    <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ User</p>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col>
                {this.state.dataReceived ? this.renderAddPlaylist() : ''}
                </Col>
            </Row>
            <Row style={{ marginBottom: "5%" }}>
                {this.state.dataReceived ? this.renderPlaylists() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
            </Row> 
            </Container>
            </div>
        );
    }
};

export default UserPlaylists;