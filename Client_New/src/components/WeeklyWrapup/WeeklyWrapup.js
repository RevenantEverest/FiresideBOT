import React, { Component } from 'react';
import './WeeklyWrapup.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader
} from 'mdbreact';

class WeeklyWrapup extends Component {

    render() {
        return(
            <div id="WeeklyWrapup">
            <Container fluid>
            <Row style={{ marginBottom: "5%" }}>
                <Col>
                    <MDBCard>
                    <MDBCardHeader style={{ background: "#1a1a1a", fontWeight: 600 }}>
                    Weekly Wrapup
                    </MDBCardHeader>
                    </MDBCard>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="WeeklyWrapup-Col">
                    <MDBCard style={{ background: "#0c0c0c", color: "inherit" }} className="cascading-admin-card">
                    <div className="admin-up">
                    <FontAwesomeIcon icon="users" className="Admin-FontAwesomeIcon orange" />
                        <div className="data">
                        <p>NEW GUILDS MEMBERS</p>
                        <h4>
                            <strong>20</strong>
                        </h4>
                        </div>
                    </div>
                    <MDBCardBody>
                        <div className="progress">
                        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="100" className="progress-bar orange" role="progressbar"
                            style={{width: '100%'}}></div>
                        </div>
                    </MDBCardBody>
                    </MDBCard>
                </Col>
                <Col md={4} className="WeeklyWrapup-Col">
                    <MDBCard style={{ background: "#0c0c0c", color: "inherit" }} className="cascading-admin-card">
                    <div className="admin-up">
                    <FontAwesomeIcon icon="magic" className="Admin-FontAwesomeIcon cyan" />
                        <div className="data">
                        <p>COMMANDS USED</p>
                        <h4>
                            <strong>120</strong>
                        </h4>
                        </div>
                    </div>
                    <MDBCardBody>
                        <div className="progress">
                        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="100" className="progress-bar cyan" role="progressbar"
                            style={{width: `100%`}}></div>
                        </div>
                    </MDBCardBody>
                    </MDBCard>
                </Col>
                <Col md={4} className="WeeklyWrapup-Col">
                    <MDBCard style={{ background: "#0c0c0c", color: "inherit" }} className="cascading-admin-card">
                    <div className="admin-up">
                    <FontAwesomeIcon icon="music" className="Admin-FontAwesomeIcon yellow" />
                        <div className="data">
                        <p>SONGS PLAYED</p>
                        <h4>
                            <strong>50</strong>
                        </h4>
                        </div>
                    </div>
                    <MDBCardBody>
                        <div className="progress">
                        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="100" className="progress-bar yellow" role="progressbar"
                            style={{width: '100%'}}></div>
                        </div>
                    </MDBCardBody>
                    </MDBCard>
                </Col>
            </Row>
            </Container>
            </div>
        );
    }
};

export default WeeklyWrapup;