import React, { Component } from 'react';
import './WeeklyWrapup.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader
} from 'mdbreact';

import commandLogServices from '../../../services/commandLogServices';
import newGuildMemberServices from '../../../services/newGuildMemberServices';

class WeeklyWrapup extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
        this.getLogsThisMonth();
    }
    componentWillUnmount = () => this._isMounted = false;

    getLogsThisMonth() {
        if(!this.props.manageServer) return;
        if(!this._isMounted) return setTimeout(() => this.getLogsThisMonth(), 2000);
        commandLogServices.getCommandsWeekByGuild(this.props.manageServer.id)
        .then(logsThisWeek => this.setState({ logsThisWeek: logsThisWeek.data.data }, () => this.getNewGuildMembers()))
        .catch(err => console.error(err));
    }

    getNewGuildMembers() {
        newGuildMemberServices.getNewGuildMembers(this.props.manageServer.id)
        .then(newMembers => this.setState({ newMembers: newMembers.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    renderServerPicker() {
        return(
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col>
                <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>
                <h5 className="h5" style={{ display: "inline-block", marginLeft: "2%" }}>Please Select A Server To Manage Before Viewing Weekly Wrapup</h5>
            </Col>
            </Row>
        );
    }

    renderSpinner() {
        return(
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col>
                <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>
            </Col>
            </Row>
        );
    }

    renderWrapUp() {
        let logsThisWeek = this.state.logsThisWeek;
        return(
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
                <Col md={4} className="WeeklyWrapup-Col">
                    <MDBCard style={{ background: "#0c0c0c", color: "inherit" }} className="cascading-admin-card">
                    <div className="admin-up">
                    <FontAwesomeIcon icon="users" className="Admin-FontAwesomeIcon orange" />
                        <div className="data">
                        <p>NEW GUILDS MEMBERS</p>
                        <h4>
                            <strong>{this.state.newMembers.length}</strong>
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
                            <strong>{logsThisWeek.length}</strong>
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
                            <strong>{logsThisWeek.filter(el => el.command === "Play").length}</strong>
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
        );
    }

    render() {
        return(
            <div id="WeeklyWrapup">
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Row style={{ marginBottom: "5%", marginLeft: 0, marginRight: 0 }}>
                <Col>
                    <MDBCard>
                    <MDBCardHeader style={{ background: "#1a1a1a", fontWeight: 600 }}>
                    Weekly Wrapup
                    </MDBCardHeader>
                    </MDBCard>
                </Col>
            </Row>
            {this.props.manageServer ? '' : this.renderServerPicker()}
            {this.state.dataReceived ? this.renderWrapUp() : ''}
            {this.props.manageServer && !this.state.dataReceived ?  this.renderSpinner() : ''}
            </Container>
            </div>
        );
    }
};

export default WeeklyWrapup;