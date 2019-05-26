import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class Dashboard extends Component {

    render() {
        return(
            <div id="Dashboard">
                <Container fluid id="Dashboard-ContainerMain">
                    <Container className="Dashboard-Container">
                    <Row>
                        <Col>
                            <h1 className="Component-Header">Dashboard</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                            <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Dashboard</p>
                        </Col>
                    </Row>
                    <Row className="Component-Content justify-content-md-center">
                        <Col>
                            <Card className="Dashboard-Card">
                            <Card.Header>
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="newspaper" style={{ marginTop: "4px" }} />
                            At A Glance
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Special title treatment</Card.Title>
                                <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Link to="/analytics">
                                <Button id="Dashboard-AAG-Button">See Full Analytics</Button>
                                </Link>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="Dashboard-Card">
                            <Card.Header>
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="bullhorn" style={{ marginTop: "4px" }} />
                            What's New
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>v1.4.0</Card.Title>
                                <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <a target="_blank" rel="noopener noreferrer" href="https://trello.com/c/LjFEBPNa/5-v140">
                                <Button id="Dashboard-WN-Button">Learn More</Button>
                                </a>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    </Container>
                </Container>
            </div>
        );
    }
};

export default Dashboard;