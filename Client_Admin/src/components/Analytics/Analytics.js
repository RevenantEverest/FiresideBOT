import React, { Component } from 'react';
import './Analytics.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import TopCommandsToday from '../TopCommandsToday/TopCommandsToday';
import TopCommandsMonth from '../TopCommandsMonth/TopCommandsMonth';
import CommandsOvertime from '../CommandsOvertime/CommandsOvertime';
import TopGuildsToday from '../TopGuildsToday/TopGuildsToday';
import TopGuildsMonth from '../TopGuildsMonth/TopGuildsMonth';
import WeeklyWrapup from '../WeeklyWrapUp/WeeklyWrapUp';

import commandLogServices from '../../services/commandLogServices';

class Analytics extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
        this.getLogs();
    }

    componentWillUnmount = () => this._isMounted = false;

    getLogs() {
        if(!this._isMounted) return;
        commandLogServices.getCommandLogs()
        .then(logs => this.setState({ logs: logs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    render() {
        return(
            <div id="Analytics">
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Analytics</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Analytics</p>
                    </Col>
                </Row>
                <Row>
                <Container fluid>
                <Row style={{ marginBottom: "5%" }}>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                        {this.state.dataReceived ? <WeeklyWrapup logs={this.state.logs} /> : <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>}
                    </Col>
                </Row>
                <Row className="justify-content-md-center" style={{ marginBottom: "2%" }}>
                    <Col>
                    <TopCommandsToday />
                    </Col>
                    <Col>
                    <TopGuildsToday />
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                    <TopCommandsMonth />
                    </Col>
                    <Col>
                    <TopGuildsMonth />
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                    <CommandsOvertime />
                    </Col>
                </Row>
                </Container>
            </Row>
                </Container>
            </div>
        );
    }
};

export default Analytics;