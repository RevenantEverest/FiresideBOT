import React, { Component } from 'react';
import './Offers.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Card } from 'react-bootstrap';

class Offers extends Component {

    render() {
        return(
            <div id="Offers" style={{ textAlign: "center", height: "auto" }}>
                <Container>
                    <Row>
                        <Col className="Offers-Col" sm={2} md={11} lg={3}>
                            <Card className="Offers-Card">
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon className="Offers-Icon" icon="music" /></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Music</Card.Subtitle>
                                <Card.Text>
                                Queue up some tunes, and same them to a playlist with our extensive Music funtionality.
                                </Card.Text>
                                <br />
                                <Card.Link href="#">Learn More</Card.Link>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col className="Offers-Col" sm={2} md={11} lg={3}>
                            <Card className="Offers-Card">
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon className="Offers-Icon" icon="bolt" /></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Moderation</Card.Subtitle>
                                <Card.Text>
                                Take control of your server with powerful admin and moderation tools.
                                </Card.Text>
                                <br />
                                <Card.Link href="#">Learn More</Card.Link>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col className="Offers-Col" sm={2} md={11} lg={3}>
                            <Card className="Offers-Card">
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon className="Offers-Icon" icon="coins" /></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Economy</Card.Subtitle>
                                <Card.Text>
                                Reward active members of your server with a server wide currency system.
                                </Card.Text>
                                <br />
                                <Card.Link href="#">Learn More</Card.Link>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="Offers-Col" sm={2} md={11} lg={3}>
                            <Card className="Offers-Card">
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon className="Offers-Icon" icon="cogs" /></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Customized Settings</Card.Subtitle>
                                <Card.Text>
                                Some default setting not to your liking? Change it up with fully customizeable options.
                                </Card.Text>
                                <br />
                                <Card.Link href="#">Learn More</Card.Link>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col className="Offers-Col" sm={2} md={11} lg={3}>
                            <Card className="Offers-Card">
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon className="Offers-Icon" icon="user-astronaut" /></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Active Developer</Card.Subtitle>
                                <Card.Text>
                                Major updates released at least once a month, and always feature packed.
                                </Card.Text>
                                <br />
                                <Card.Link href="#">Learn More</Card.Link>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col className="Offers-Col" sm={2} md={11} lg={3}>
                            <Card className="Offers-Card">
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon className="Offers-Icon" icon="code" /></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Open Source</Card.Subtitle>
                                <Card.Text>
                                Fireside has been and always will be open source. Feel free to contribute or check out the project by clicking the github link below.
                                </Card.Text>
                                <br />
                                <Card.Link href="https://github.com/RevenantEverest/FiresideBOT">Github</Card.Link>
                                <Card.Link href="#">Learn More</Card.Link>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Offers;