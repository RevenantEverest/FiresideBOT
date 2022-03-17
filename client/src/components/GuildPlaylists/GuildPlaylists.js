import React, { Component } from 'react';
import './GuildPlaylists.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import UnderConstruction from '../UnderConstruction/UnderConsturction';

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
            <div id="GuildPlaylists" style={{ marginBottom: "5%" }}>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Guild Playlists</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <Link to="/playlists"><p className="Component-Breadcrumb">/ Playlists </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Guild</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <UnderConstruction />
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default GuildPlaylists;