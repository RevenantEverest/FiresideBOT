import React, { Component } from 'react';
import '../css/HomePage.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBJumbotron,
    MDBCardText,
    MDBBtn
} from 'mdbreact';

import Sections from '../sections/Sections';

import env from '../../env';

class HomePage extends Component {

    _inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${env.CLIENT_ID}&permissions=8&scope=bot`;

    render() {
        return(
            <div id="HomePage" className="app-page">
                <Container fluid>
                <Row>
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <MDBJumbotron style={{ paddingTop: "8px", paddingBottom: "0", background: "inherit" }} fluid>
                        <Col className="text-white" style={{ backgroundImage: `url(https://i.imgur.com/r7kBhso.jpg)`, backgroundSize: "cover" }}>
                        <Container>
                        <Row style={{ marginTop: "-20px" }}>
                            <Col className="py-5">
                                <img src="https://i.imgur.com/KR9xQdZ.png" alt="" className="HomePage-Logo" />
                                <h1 className="h1 HomePage-Logo_Text HomePage-Header-Text">FiresideBOT</h1>
                                <h3 className="HomePage-HelpDocs-Text">
                                    Help Docs
                                </h3>
                                <MDBCardText tag="div">
                                    <h6 className="h6">The all in one Discord Bot guaranteed to bring new life to your server!</h6>
                                    <br />
                                    <Link to="/gettingstarted"><MDBBtn className="Button" size="md">Getting Started</MDBBtn></Link>
                                    <MDBBtn className="DiscordButton" size="md" tag="a" target="_blank" rel="noopener noreferrer" href={this._inviteLink}>
                                    Add To Discord
                                    </MDBBtn>
                                </MDBCardText>
                            </Col>
                        </Row>
                        </Container>
                        </Col>
                    </MDBJumbotron>
                    </Col>
                </Row>
                <Sections />
                </Container>
            </div>
        );
    };
};

export default HomePage;