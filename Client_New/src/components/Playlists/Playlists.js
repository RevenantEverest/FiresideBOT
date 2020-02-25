import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Playlists.css';

import { Container, Row, Col } from 'react-bootstrap';

class Playlists extends Component {

    render() {
        return(
            <div id="Playlists">
                <Container fluid id="Playlists-ContainerMain">
                <Container className="Playlists-Container">
                    <Row className="justify-content-md-center">
                        <Col lg={4}>
                            <Link to="/playlists/user">
                            <div as="div" id="Playlists-MyPlaylists">My Playlists</div>
                            </Link>
                        </Col>
                        <Col lg={4}>
                            <Link to="/playlists/guild">
                            <div as="div" id="Playlists-GuildPlaylists">Guild Playlists</div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
                </Container>
            </div>
        );
    }
};

export default Playlists;