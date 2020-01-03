import React, { Component } from 'react';
import './Analytics.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import TopCommandsToday from '../TopCommandsToday/TopCommandsToday';
import TopCommandsMonth from '../TopCommandsMonth/TopCommandsMonth';
import CommandsOvertime from '../CommandsOvertime/CommandsOvertime';
import WeeklyWrapup from '../WeeklyWrapup/WeeklyWrapup';

class Analytics extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getServerLogs();
    }

    componentWillUnmount() { this._isMounted = false; }

    getServerLogs() {
        if(!this._isMounted) return setTimeout(() => this.getServerLogs(), 2000);
        if(!this.state.manageServer) return;
        // Get Logs
        this.setState({ dataReceived: true })
    }

    renderServerPicker() {
        return(
            <div>
                <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>
                <h5 className="h5" style={{ display: "inline-block", marginLeft: "2%" }}>Please Select A Server To Manage Before Continuing</h5>
            </div>
        );
    }

    renderAnalytics() {
        return(
            <Container fluid>
            <Row style={{ marginBottom: "5%" }}>
            <Col>
                <WeeklyWrapup />
            </Col>
            </Row>
            <Row style={{ marginBottom: "2%" }}>
                <Col>
                <TopCommandsToday />
                </Col>
                <Col>
                <TopCommandsMonth />
                </Col>
            </Row>
            <Row style={{ marginBottom: "5%" }}>
                <Col>
                <CommandsOvertime />
                </Col>
            </Row>
            </Container>
        );
    }

    render() {
        return(
            <div id="Analytics" style={{ marginBottom: "5%" }}>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Analytics</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "4%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Analytics</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="justify-content-sm-center justify-content-xs-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    {/* {!this.state.dataReceived && this.props.manageServer ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : ''}
                    {!this.state.manageServer ? this.renderServerPicker() : ''}
                    {this.state.dataReceived ? this.renderAnalytics() : ''} */}
                    {this.renderAnalytics()}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Analytics;