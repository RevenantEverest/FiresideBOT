import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Breadcrumb from '../sections/Breadcrumb';

class ClosedTickets extends Component {

    _Routes = [
        { to: "/tickets/closed", pathname: "Tickets" },
        { main: true, pathname: "Closed" }
    ];

    render() {
        return(
            <div id="ClosedTickets" className="app-page">
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

export default ClosedTickets;