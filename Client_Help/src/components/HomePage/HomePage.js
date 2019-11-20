import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

import { Container, Row, Col } from 'react-bootstrap';
import { 
    MDBCol, 
    MDBJumbotron, 
    MDBCardTitle, 
    MDBBtn, 
    MDBCard,
    MDBCardBody,
    MDBCardText
} from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skin from '../../res/Skin';

class HomePage extends Component {

    _inviteLink = `https://discordapp.com/oauth2/authorize?client_id=441338104545017878&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=bot`;

    render() {
        return(
            <div id="HomePage">
                <Container fluid>
                <Row style={{ marginBottom: "5%" }} className="justify-content-md-center">
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <MDBJumbotron style={{ padding: "0", background: "inherit" }} fluid>
                        <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://i.imgur.com/r7kBhso.jpg)` }}>
                        <MDBCol className="py-5">
                            <img src="https://i.imgur.com/ER0tEk0.png" alt="" className="HomePage-Logo" />
                            <MDBCardText tag="div">
                                <Link to="/gettingstarted">
                                <MDBBtn color={Skin.MDBColor} className="mb-5 Button HomePage-Button">Getting Started</MDBBtn>
                                </Link>
                                <a target="_blank" rel="noopener noreferrer" href={this._inviteLink}>
                                <MDBBtn color={Skin.MDBColor} tag="div" className="mb-5 DiscordButton HomePage-Button">
                                Add To Discord
                                </MDBBtn>
                                </a>
                            </MDBCardText>
                        </MDBCol>
                        </MDBCol>
                    </MDBJumbotron>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Container>
                    <Row className="justify-content-xs-center justify-content-sm-center">
                        <Col lg={4} md={3} sm={8} xs={12} style={{ marginBottom: "5%" }}>
                        <MDBCard className="text-center w-auto">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "200px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="magic" />
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5" style={{ height: "50px", color: "#cccccc" }}>
                                Learn about all of Fireside's commands.
                            </MDBCardText>
                            <Link to="/commands">
                            <MDBBtn color={Skin.MDBColor} tag="div" className="Button">View All Commands</MDBBtn>
                            </Link>
                            </MDBCardBody>
                        </MDBCard>
                        </Col>

                        <Col lg={4} md={3} sm={8} xs={12} style={{ marginBottom: "5%" }}>
                        <MDBCard className="text-center w-auto">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "200px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="gem" />
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5" style={{ height: "50px", color: "#cccccc" }}>
                                Learn about what Fireside Premium has to offer!
                            </MDBCardText>
                            <Link to="/premium">
                            <MDBBtn color={Skin.MDBColor} ta="div" className="Button">Learn More</MDBBtn>
                            </Link>
                            </MDBCardBody>
                        </MDBCard>
                        </Col>

                        <Col lg={4} md={3} sm={8} xs={12} style={{ marginBottom: "5%" }}>
                        <MDBCard className="text-center w-auto">
                            <MDBCardBody style={{ background: "#1a1a1a", height: "200px" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="question-circle" />
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
                </Row>
                </Container>
            </div>
        );
    }
};

export default HomePage;