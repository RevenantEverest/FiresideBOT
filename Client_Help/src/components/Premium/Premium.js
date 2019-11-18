import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import Skin from '../../res/Skin';

class Premium extends Component {

    render() {
        return(
            <div id="Premium" style={{ marginTop: "2%", marginBottom: "5%" }}>
                <Container>
                <Row style={{ marginBottom: "10%" }}>
                    <Col>
                        <h1 className="h1">Fireside Premium</h1>
                        <h5 className="h5">Support Fireside's development, while receiving extras features!</h5>
                        <br />
                        <Container >
                        <Row>
                            <Col md={3.5}>
                                <p style={{ marginBottom: "4%", fontSize: "14px" }}>User Premium</p>
                                <h5 className="h5" style={{ marginTop: "0" }}>$4.99 /month</h5>
                                <MDBBtn color={Skin.MDBColor} className="Button" style={{ width: "120px" }} size="md">
                                    Select
                                </MDBBtn>
                            </Col>
                            <Col md={3.5}>
                                <p style={{ marginBottom: "4%", fontSize: "14px" }}>Server Premium</p>
                                <h5 className="h5" style={{ marginTop: "0" }}>$4.99 /month</h5>
                                <MDBBtn color={Skin.MDBColor} className="Button" style={{ width: "120px" }} size="md">
                                    Select
                                </MDBBtn>
                            </Col>
                            <Col md={3.5}>
                                <p style={{ marginBottom: "4%", fontSize: "14px" }}>Both</p>
                                <h5 className="h5" style={{ marginTop: "0" }}>$9.99 /month</h5>
                                <MDBBtn color={Skin.MDBColor} className="Button" style={{ width: "120px" }} size="md">
                                    Select
                                </MDBBtn>
                            </Col>
                        </Row>
                        </Container>
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <h4 className="h4">User Premium Features</h4>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "10%" }}>
                    <Col>
                        <MDBCard style={{ width: "22rem" }} className="text-center">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "250px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="music" />
                            <br />
                            Unlimited Song Request Length
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5" style={{ height: "50px", color: "#cccccc" }}>
                                Need more help than what's provided here? Join our support server!
                            </MDBCardText>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                            <MDBBtn color={Skin.MDBColor} className="Button">
                            Join Support Server
                            </MDBBtn>
                            </a>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                    <Col>
                        <MDBCard style={{ width: "22rem" }} className="text-center">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "250px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="headphones-alt" />
                            <br />
                            Unlimited Playlists
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5" style={{ height: "50px", color: "#cccccc" }}>
                                Need more help than what's provided here? Join our support server!
                            </MDBCardText>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                            <MDBBtn color={Skin.MDBColor} className="Button">
                            Join Support Server
                            </MDBBtn>
                            </a>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                    <Col>
                        <MDBCard style={{ width: "22rem" }} className="text-center">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "250px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="record-vinyl" />
                            <br />
                            Unlimited Playlist Song Length
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5" style={{ height: "50px", color: "#cccccc" }}>
                                Need more help than what's provided here? Join our support server!
                            </MDBCardText>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                            <MDBBtn color={Skin.MDBColor} className="Button">
                            Join Support Server
                            </MDBBtn>
                            </a>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                </Row>

                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <h4 className="h4">Server Premium Features</h4>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "4%" }}>
                <Col>
                        <MDBCard style={{ width: "22rem" }} className="text-center">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "250px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="headphones-alt" />
                            <br />
                            Unlimited Server Playlists
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5" style={{ height: "50px", color: "#cccccc" }}>
                                Need more help than what's provided here? Join our support server!
                            </MDBCardText>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                            <MDBBtn color={Skin.MDBColor} className="Button">
                            Join Support Server
                            </MDBBtn>
                            </a>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                    <Col>
                        <MDBCard style={{ width: "22rem" }} className="text-center">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "250px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="record-vinyl" />
                            <br />
                            Unlimited Server Playlist Song Length
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5" style={{ height: "50px", color: "#cccccc" }}>
                                Need more help than what's provided here? Join our support server!
                            </MDBCardText>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                            <MDBBtn color={Skin.MDBColor} className="Button">
                            Join Support Server
                            </MDBBtn>
                            </a>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                    <Col style={{ marginBottom: "4%" }}>
                        <MDBCard style={{ width: "22rem" }} className="text-center">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "250px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="shield-alt" />
                            <br />
                            Unlimited Server Ranks
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5" style={{ height: "50px", color: "#cccccc" }}>
                                Need more help than what's provided here? Join our support server!
                                
                            </MDBCardText>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                            <MDBBtn color={Skin.MDBColor} className="Button">
                            Join Support Server
                            </MDBBtn>
                            </a>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                    <Col style={{ marginBottom: "4%" }}>
                        <MDBCard style={{ width: "22rem" }} className="text-center">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "250px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="magic" />
                            <br />
                            Unlimited Custom Commands
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5" style={{ height: "50px", color: "#cccccc" }}>
                                Need more help than what's provided here? Join our support server!
                                
                            </MDBCardText>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                            <MDBBtn color={Skin.MDBColor} className="Button">
                            Join Support Server
                            </MDBBtn>
                            </a>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Premium;