import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserPlaylists.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

//Component Imports
import AddPlaylist from '../AddPlaylist/AddPlaylist';

//Services Imports
import userPlaylistServices from '../../services/UserServices/userPlaylistServices';
import userSongsServices from '../../services/UserServices/userSongsServices';

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

    deletePlaylist(el) {
        userPlaylistServices.deletePlaylist(el.playlist_id)
        .then(() => this.getPlaylists())
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
                <Col key={idx} style={{ paddingLeft: "0", paddingRight: "0" }}>
                <Card className="UserPlaylists-Card" style={{ width: '18rem', margin: "20px" }}>
                <Card.Header>
                <FontAwesomeIcon className="FontAwesomeIcon" icon="headphones-alt" style={{ marginTop: "4px" }} />
                {el.playlist_name}
                </Card.Header>
                <Card.Body>
                    {/* <Card.Title>{el.playlist_name}</Card.Title> */}
                    <Card.Subtitle className="mb-2 text-muted">
                    <FontAwesomeIcon style={{ marginRight: "2%" }} icon="compact-disc" />
                    {el.songCount}
                    <br />
                    <br />
                    <FontAwesomeIcon style={{ marginRight: "2%" }} icon="clock" />
                    {el.overallLength}
                    </Card.Subtitle>
                    <Link to={{
                        pathname: `/playlists/user/${el.playlist_name}`,
                        state: {
                            userData: this.props.userData,
                            manageServer: this.props.manageServer,
                            playlistData: el
                        }
                    }}>
                    <Button className="UserPlaylists-View-Button">View Playlist</Button>
                    </Link>
                    <FontAwesomeIcon className="FontAwesomeIcon UserPlaylists-Trash" icon="trash-alt" onClick={(e) => this.deletePlaylist(el)} />
                </Card.Body>
                </Card>
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
                <Container fluid id="UserPlaylists-ContainerMain">
                    <Container id="UserPlaylists-Container">
                    <Row>
                        <Col>
                            <h1 className="Component-Header">Playlists</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                            <Link to="/playlists"><p className="Component-Breadcrumb">/ Playlists </p></Link>
                            <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ User</p>
                        </Col>
                    </Row>
                    <Row className="Component-Content justify-content-md-end">
                        {this.state.dataReceived ? this.renderAddPlaylist() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    </Row>
                    <Row className="Component-Content" style={{ marginBottom: "40px", marginLeft: "0", marginRight: "0" }}>
                        {this.state.dataReceived ? this.renderPlaylists() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    </Row>    
                    </Container>
                </Container>
            </div>
        );
    }
};

export default UserPlaylists;