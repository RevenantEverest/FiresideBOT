import React, { Component } from 'react';
import './SinglePlaylist.css';

import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';

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
    }

    componentDidMount() {
        this._isMounted = true;
        this.getSongs();
    }

    getSongs() {

    }

    removeSong() {

    }

    renderSongs() {

    }

    render() {
        return(
            <div id="SinglePlaylist">
            <Container fluid id="SinglePlaylist-ContainerMain">
                <Container className="SinglePlaylist-Container">
                <Row>
                <Col>
                
                </Col>
                </Row>
                </Container>
            </Container>
            </div>
        );
    }
};

export default SinglePlaylist;