import React, { Component } from 'react';
import './Offers.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdbreact';

import Skin from '../../res/Skin';

class Offers extends Component {

    _helpLink = "https://help.firesidebot.com";
    _githubLink = "https://github.com/RevenantEverest/FiresideBOT";

    render() {
        return(
            <div id="Offers">
                <Container>
                <Row className="justify-content-sm-center">
                    <Col lg={4} md={6} sm={10} xs={12} style={{ marginBottom: "5%" }}>
                    <MDBCard className="text-center w-auto" >
                    <MDBCardBody style={{ background: "#1a1a1a", height: "280px" }}>
                        <MDBCardTitle>
                            <FontAwesomeIcon className="Offers-Icon" icon="gem" />
                            <br />
                            <br />
                            Premium
                        </MDBCardTitle>
                        <MDBCardText style={{ height: "40px", color: "white" }}>
                        Queue up some tunes, and save them to a playlist with our extensive Music funtionality.
                        </MDBCardText>
                        <br />
                        <MDBBtn color={Skin.hex} tag="a" style={{ background: Skin.hex }} size="md" target="_blank" rel="noopener noreferrer" href={this._helpLink}>
                        Learn More
                        </MDBBtn>
                    </MDBCardBody>
                    </MDBCard>
                    </Col>
                    <Col lg={4} md={6} sm={10} xs={12} style={{ marginBottom: "5%" }}>
                    <MDBCard className="text-center w-auto" >
                    <MDBCardBody style={{ background: "#1a1a1a", height: "280px" }}>
                        <MDBCardTitle>
                            <FontAwesomeIcon className="Offers-Icon" icon="bolt" />
                            <br />
                            <br />
                            Moderation
                        </MDBCardTitle>
                        <MDBCardText style={{ height: "40px", color: "white" }}>
                        Take control of your server with powerful admin and moderation tools.
                        </MDBCardText>
                        <br />
                        <MDBBtn color={Skin.hex} tag="a" style={{ background: Skin.hex }} size="md" target="_blank" rel="noopener noreferrer" href={this._helpLink}>
                        Learn More
                        </MDBBtn>
                    </MDBCardBody>
                    </MDBCard>
                    </Col>
                    <Col lg={4} md={6} sm={10} xs={12} style={{ marginBottom: "5%" }}>
                    <MDBCard className="text-center w-auto" >
                    <MDBCardBody style={{ background: "#1a1a1a", height: "280px" }}>
                        <MDBCardTitle>
                            <FontAwesomeIcon className="Offers-Icon" icon="question-circle" />
                            <br />
                            <br />
                            Support Server
                        </MDBCardTitle>
                        <MDBCardText style={{ height: "40px", color: "white" }}>
                        Reward active members of your server with a server wide currency system.
                        </MDBCardText>
                        <br />
                        <MDBBtn color={Skin.hex} tag="a" style={{ background: Skin.hex }} size="md" target="_blank" rel="noopener noreferrer" href={this._helpLink}>
                        Learn More
                        </MDBBtn>
                    </MDBCardBody>
                    </MDBCard>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Offers;