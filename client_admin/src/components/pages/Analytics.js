import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Breadcrumb from '../sections/Breadcrumb';

class Analytics extends Component {

    _Routes = [{ main: true, pathname: "Analytics" }];

    render() {
        return(
            <div id="Analytics" className="app-page">
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

export default Analytics;