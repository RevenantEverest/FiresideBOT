import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SinglePlaylist.css';

import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    MDBFormInline, 
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader
} from 'mdbreact';

//Component Imports
import AddSong from '../AddSong/AddSong';

//Services Imports
import userSongsServices from '../../services/UserServices/userSongsServices';

import Skin from '../../res/Skin';

class SinglePlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.location.state.userData,
            manageServer: this.props.location.state.manageServer,
            playlistData: this.props.location.state.playlistData,
            search: ''
        }
        this.getSongs = this.getSongs.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getSongs();
    }

    getSongs() {
        if(!this._isMounted) return setTimeout(() => this.getSongs(), 2000);
        userSongsServices.getPlaylistSongInfo(this.state.playlistData.playlist_id)
        .then(songs => this.setState({ songData: songs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    findModal = (index) => this.state[("modal" + index)];

    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
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
        let Songs = this.state.songData.filter(el => { return el.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 }).map((el, idx) => {
            idx++;
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
                        <MDBBtn color="elegant" className="SinglePlaylist-Icon-Trash" size="sm" onClick={this.toggle((idx + 1))}>
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="trash-alt" />
                        </MDBBtn>

                        <MDBModal isOpen={this.findModal((idx + 1))} toggle={this.toggle((idx + 1))} centered>
                        <MDBModalHeader toggle={this.toggle((idx + 1))} className="Modal">
                        <h4 className="h4 display-inline">Are you sure you want to delete </h4>
                        <h4 className="h4 display-inline" style={{ fontWeight: 600, color: "orange" }}>{el.title}</h4>
                        <h4 className="h4 display-inline">?</h4>
                        </MDBModalHeader>
                        <MDBModalBody className="Modal">
                            <MDBBtn color="elegant" onClick={this.toggle((idx + 1))}>Close</MDBBtn>
                            <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} onClick={() => this.removeSong(el)}>Delete Song</MDBBtn>
                        </MDBModalBody>
                        </MDBModal>
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
            <Container>
            <Row>
                <Col>
                    <h1 className="Component-Header">{this.state.playlistData.playlist_name}</h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col>
                    <Link to="/"><p className="Component-Breadcrumb SinglePlaylist-Breadcrumb">Home </p></Link>
                    <Link to="/playlists"><p className="Component-Breadcrumb">/ Playlists </p></Link>
                    <Link to="/playlists/user"><p className="Component-Breadcrumb">/ User </p></Link>
                    <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ {this.state.playlistData.playlist_name}</p>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col lg={10}>
                    <MDBFormInline className="md-form" style={{ marginTop: 0, marginBottom: 0 }}>
                        <FontAwesomeIcon icon="search" style={{ marginRight: "2%" }}/>
                        <input 
                        className="form-control" 
                        style={{ background: "transparent", color: "#cccccc", width: "140px" }} 
                        type="text"
                        name="search"
                        placeholder="Search" 
                        aria-label="Search"
                        onChange={this.handleChange}
                        />
                    </MDBFormInline>
                </Col>
                <Col lg={2}>
                    <MDBBtn color={Skin.hex} style={{ background: Skin.hex, padding: "8px", width: "150px" }} onClick={this.toggle(1)}>
                        <FontAwesomeIcon icon="music" style={{ marginRight: "2%" }}/>
                        Add Song
                    </MDBBtn>
                    <MDBModal isOpen={this.findModal(1)} toggle={this.toggle(1)} centered>
                    <MDBModalHeader toggle={this.toggle(1)} className="Modal">Add Song</MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <AddSong 
                        userData={this.state.userData} 
                        manageServer={this.state.manageServer} 
                        playlistData={this.state.playlistData}
                        getSongs={this.getSongs}
                        />
                    </MDBModalBody>
                    </MDBModal>
                </Col>
            </Row>
            <Row style={{ marginBottom: "5%" }}>
                <Col>
                {this.state.dataReceived ? this.renderSongs() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                </Col>
            </Row>
            </Container>
            </div>
        );
    }
};

export default SinglePlaylist;