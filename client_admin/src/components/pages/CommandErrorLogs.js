import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Breadcrumb from '../sections/Breadcrumb';

class CommandErrorLogs extends Component {

    _Routes = [
        { to: "/logs/errors", pathname: "Logs" },
        { main: true, pathname: "Error" }
    ];

    render() {
        return(
            <div id="CommandErrorLogs" className="app-page">
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

export default CommandErrorLogs;