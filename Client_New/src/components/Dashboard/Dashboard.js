import React, { Component } from 'react';
import './Dashboard.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import WeeklyWrapup from '../Analytics/WeeklyWrapup/WeeklyWrapup';
import RecentChangelog from './RecentChangelog/RecentChangelog';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData
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

    render() {
        const { changelogs } = this.props;
        return(
            <div id="Dashboard" style={{ marginBottom: "5%" }}>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Dashboard</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Dashboard</p>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <WeeklyWrapup manageServer={this.props.manageServer} />
                    </Col>
                </Row>
                <Row className="Component-Content justify-content-md-center">
                    <Col>
                        {changelogs ? <RecentChangelog changelogs={changelogs} /> : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Dashboard;