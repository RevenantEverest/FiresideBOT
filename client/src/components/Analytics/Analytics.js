import React, { Component } from 'react';
import './Analytics.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import TopCommandsToday from './TopCommandsToday/TopCommandsToday';
import TopCommandsMonth from './TopCommandsMonth/TopCommandsMonth';
import CommandsOvertime from './CommandsOvertime/CommandsOvertime';
import WeeklyWrapup from './WeeklyWrapup/WeeklyWrapup';

class Analytics extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
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
            <Row>
                <Container fluid>
                <Row style={{ marginBottom: "5%" }}>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <WeeklyWrapup manageServer={this.props.manageServer} />
                </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                    <TopCommandsToday manageServer={this.props.manageServer} />
                    </Col>
                    <Col>
                    <TopCommandsMonth manageServer={this.props.manageServer} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                    <CommandsOvertime manageServer={this.props.manageServer} />
                    </Col>
                </Row>
                </Container>
            </Row>
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
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Analytics</p>
                    </Col>
                </Row>
                {this.props.manageServer ? this.renderAnalytics() : this.renderServerPicker()}
                </Container>
            </div>
        );
    }
};

export default Analytics;