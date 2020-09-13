import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Breadcrumb from '../sections/Breadcrumb';

class Dashboard extends Component {

    _Routes = [{ main: true, pathname: "Dashboard" }];

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return(
            <div id="Dashboard" className="app-page">
                <Container fluid>
                <Breadcrumb routes={this._Routes} />
                <Row>
                    <Col>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Dashboard;