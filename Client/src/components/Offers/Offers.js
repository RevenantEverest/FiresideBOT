import React, { Component } from 'react';
import './Offers.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdbreact';

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
                            <FontAwesomeIcon className="Offers-Icon" icon="magic" />
                            <br />
                            <br />
                            View Commands
                        </MDBCardTitle>
                        <MDBCardText style={{ height: "40px", color: "white" }}>
                        Take a look at all the commands Fireside has to offer!
                        </MDBCardText>
                        <br />
                        <MDBBtn className="Button" size="md" tag="a" target="_blank" rel="noopener noreferrer" href={this._helpLink + "/commands"}>
                        Learn More
                        </MDBBtn>
                    </MDBCardBody>
                    </MDBCard>
                    </Col>
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
                        Enhance your Fireside experience with our Premium features!
                        </MDBCardText>
                        <br />
                        <Link to="/premium">
                            <MDBBtn className="Button" size="md">
                            Learn More
                            </MDBBtn>
                        </Link>
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
                        Join our support server for real time help as well as participating in new feature suggestions and discussions!
                        </MDBCardText>
                        <br />
                        <MDBBtn className="Button" size="md" tag="a" target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
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