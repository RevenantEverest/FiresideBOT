import React, { Component } from 'react';
import './Dashboard.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import WeeklyWrapUp from '../WeeklyWrapUp/WeeklyWrapUp';

import commandLogServices from '../../services/commandLogServices';

class Dashboard extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {}
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
            <Row>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                {this.state.dataReceived ? <WeeklyWrapUp logs={this.state.logs} /> : <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>}
                </Col>
            </Row>
            </Container>
            </div>
        )
    }
};

export default Dashboard;