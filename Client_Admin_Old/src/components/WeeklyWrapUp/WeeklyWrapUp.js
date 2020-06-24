import React, { Component } from 'react';
import './WeeklyWrapUp.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBBadge
} from 'mdbreact';

import WeeklyCommands from '../WeeklyCommands/WeeklyCommands';

class WeeklyWrapUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logs: this.props.logs
        }
    }

    renderNewGuilds() {
        return(
            <Col md={4} className="WeeklyWrapUp-Col">
                <MDBCard style={{ background: "#0c0c0c", color: "inherit" }} className="cascading-admin-card">
                <div className="admin-up">
                <FontAwesomeIcon icon="users" className="Admin-FontAwesomeIcon orange" />
                    <div className="data">
                    <p>NEW GUILDS</p>
                    <h4>
                        <strong>20</strong>
                    </h4>
                    </div>
                </div>
                <MDBCardBody>
                    <div className="progress">
                    <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar orange" role="progressbar"
                        style={{width: '25%'}}></div>
                    </div>
                    <MDBCardText style={{ color: "inherit" }} tag="div">
                        Better than last week (25%) This is Fake Data
                        <MDBBadge color="success" style={{ width: "30px", display: "inline-block", marginLeft: "2%", fontSize: "8px" }}>
                            <FontAwesomeIcon icon="arrow-up" />
                        </MDBBadge>
                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </Col>
        );
    }

    renderDonations() {
        return(
            <Col md={4} className="WeeklyWrapUp-Col">
                <MDBCard style={{ background: "#0c0c0c", color: "inherit" }} className="cascading-admin-card">
                <div className="admin-up">
                <FontAwesomeIcon icon="money-bill-alt" className="Admin-FontAwesomeIcon yellow" />
                    <div className="data">
                    <p>DONATIONS</p>
                    <h4>
                        <strong>$2000</strong>
                    </h4>
                    </div>
                </div>
                <MDBCardBody>
                    <div className="progress">
                    <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" className="progress-bar yellow" role="progressbar"
                        style={{width: '70%'}}></div>
                    </div>
                    <MDBCardText style={{ color: "inherit" }}>Better than last week (70%) This is Fake Data</MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </Col>
        );
    }

    render() {
        return(
            <div id="WeeklyWrapup">
            <Row className="justify-content-md-center WeeklyWrapUp-Row" style={{ marginLeft: 0, marginRIght: 0 }}>
                {this.state.logs ? this.renderNewGuilds() : ''}
                <WeeklyCommands logs={this.props.logs} />
                {this.state.logs ? this.renderDonations(): ''}
            </Row>
            </div>
        );
    }
};

export default WeeklyWrapUp;