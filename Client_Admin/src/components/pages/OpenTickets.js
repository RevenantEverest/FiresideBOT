import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Breadcrumb from '../sections/Breadcrumb';

class OpenTickets extends Component {

    _Routes = [
        { to: "/tickets/open", pathname: "Tickets" },
        { main: true, pathname: "Open" }
    ];

    render() {
        return(
            <div id="OpenTickets" className="app-page">
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

export default OpenTickets;