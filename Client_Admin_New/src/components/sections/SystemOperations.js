import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'mdbreact';

import SystemRestarts from './SystemRestarts';
import SystemStops from './SystemStops';
import SystemStarts from './SystemStarts';

class SystemOperations extends Component {

    render() {
        return(
            <div className="SystemOperations">
                <Container fluid>
                <ToastContainer position="top-center" autoClose={5000} newestOnTop hideProgressBar={false} />
                <Row>
                    <Col>
                        <SystemRestarts />
                    </Col>
                    <Col>
                        <SystemStops />
                    </Col>
                    <Col>
                        <SystemStarts />
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default SystemOperations;