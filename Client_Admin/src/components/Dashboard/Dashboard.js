import React, { Component } from 'react';
import './Dashboard.css';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody, 
    MDBBreadcrumb,
    MDBBreadcrumbItem
} from 'mdbreact';

import WeeklyWrapUp from '../Sections/WeeklyWrapUp/WeeklyWrapUp';
import TopCommandsToday from '../DataSets/TopCommandsToday/TopCommandsToday';
import TopCommandsMonth from '../DataSets/TopCommandsMonth/TopCommandsMonth';
import CommandsOvertime from '../DataSets/CommandsOvertime/CommandsOvertime';

import TopGuildsToday from '../DataSets/TopGuildsToday/TopGuildsToday';
import TopGuildsMonth from '../DataSets/TopGuildsMonth/TopGuildsMonth';



class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            logs: this.props.logs
        }
    }

    render() {
        return(
            <div id="Dashboard" style={{ marginTop: "5%", marginBottom: "5%" }}>
            <Container fluid>
                <Row className="justify-content-md-center" style={{ marginBottom: "2%" }}>
                    <Col md={9}>
                        <MDBCard style={{ background: "#0c0c0c" }}>
                            <MDBCardBody className="d-flex align-items-center justify-content-between" style={{ color: "inherit", margin: "0" }}>
                                <MDBBreadcrumb style={{ background: "#151515" }}>
                                    <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
                                    <MDBBreadcrumbItem active>Dashboard</MDBBreadcrumbItem>
                                </MDBBreadcrumb>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <WeeklyWrapUp logs={this.props.logs} />
                    </Col>
                </Row>

                {/* Commands */}
                <Row className="justify-content-md-center" style={{ marginBottom: "2%" }}>
                    <Col md={5}>
                        <TopCommandsToday logs={this.props.logs} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center" style={{ marginBottom: "2%" }}>
                    <Col md={5}>
                        <TopCommandsMonth logs={this.props.logs} />
                    </Col>
                    <Col md={5}>
                        <CommandsOvertime logs={this.props.logs} />
                    </Col>
                </Row>

                {/* Guilds */}
                <Row className="justify-content-md-center" style={{ marginBottom: "2%" }}>
                    <Col md={5}>
                        <TopGuildsToday logs={this.props.logs} />
                    </Col>
                    <Col md={5}>
                        <TopGuildsMonth logs={this.props.logs} />
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
};

export default Dashboard;