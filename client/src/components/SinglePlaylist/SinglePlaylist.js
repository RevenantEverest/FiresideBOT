import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SinglePlaylist.css';

import { Container, Row, Col, Table, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Component Imports
import AddSong from '../AddSong/AddSong';

//Services Imports
import userSongsServices from '../../services/UserServices/userSongsServices';

class SinglePlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.location.state.userData,
            manageServer: this.props.location.state.manageServer,
            playlistData: this.props.location.state.playlistData,
        }
        this.getSongs = this.getSongs.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getSongs();

        console.log(this.state.playlistData)
    }

    getSongs() {
        if(!this._isMounted) return setTimeout(() => this.getSongs(), 2000);
        userSongsServices.getPlaylistSongInfo(this.state.playlistData.playlist_id)
        .then(songs => this.setState({ songData: songs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    removeSong(el) {
        userSongsServices.removeSong(el.song_id)
        .then(() => this.getSongs())
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

    renderSongs() {
        let Songs = this.state.songData.map((el, idx) => {
            return(
                <tr key={idx}>
                    <td className="SinglePlaylist-TD SinglePlaylist-TD-Number">{idx + 1}</td>
                    <td className="SinglePlaylist-TD SinglePlaylist-TD-Title">{el.title}</td>
                    <td className="SinglePlaylist-TD SinglePlaylist-TD-Author">{el.author}</td>
                    <td className="SinglePlaylist-TD SinglePlaylist-TD-Duration" style={{ textAlign: "center" }}>
                        {this.timeParser(el.duration)}
                    </td>
                    <td className="SinglePlaylist-TD SinglePlaylist-TD-Link" style={{ textAlign: "center" }}>
                        <Link className="SinglePlaylist-Link" to={`${el.link}`}>Click Me</Link>
                    </td>
                    <td className="SinglePlaylist-TD SinglePlaylist-TD-Action" style={{ textAlign: "center" }}>
                        <FontAwesomeIcon className="SinglePlaylist-Icon-Trash" icon="trash-alt" onClick={() => this.removeSong(el)}/>
                    </td>
                </tr>
            );
        });

        return(
            <Table striped bordered hover variant="dark" id="SinglePlaylist-Table">
            <thead>
                <tr>
                <th className="SinglePlaylist-TH">#</th>
                <th className="SinglePlaylist-TH">Title</th>
                <th className="SinglePlaylist-TH">Author</th>
                <th className="SinglePlaylist-TH" style={{ textAlign: "center" }}>
                    <FontAwesomeIcon className="FontAwesomeIcon" icon="clock" />
                </th>
                <th className="SinglePlaylist-TH" style={{ textAlign: "center" }}>
                    <FontAwesomeIcon className="FontAwesomeIcon" icon="link" />
                </th>
                <th className="SinglePlaylist-TH" style={{ textAlign: "center" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {Songs}
            </tbody>
            </Table>
        );
    }

    render() {
        return(
            <div id="SinglePlaylist">
            <Container fluid id="SinglePlaylist-ContainerMain">
                <Container className="SinglePlaylist-Container">
                <Row>
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                        <h1 className="Component-Header">Playlist</h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                        <Link to="/"><p className="Component-Breadcrumb SinglePlaylist-Breadcrumb">Home </p></Link>
                        <Link to="/playlists"><p className="Component-Breadcrumb">/ Playlists </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ {this.state.playlistData.playlist_name}</p>
                    </Col>
                </Row>
                <Row className="Component-Content">
                    <AddSong 
                    userData={this.state.userData} 
                    manageServer={this.state.manageServer} 
                    playlistData={this.state.playlistData}
                    getSongs={this.getSongs}
                    />
                </Row>
                <Row className="Component-Content">
                    <Col>
                    {this.state.dataReceived ? this.renderSongs() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    </Col>
                </Row>
                </Container>
            </Container>
            </div>
        );
    }
};

export default SinglePlaylist;