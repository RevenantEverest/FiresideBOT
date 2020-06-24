import React, { Component } from 'react';
import './HomePage.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBBtn } from 'mdbreact';

class HomePage extends Component {

    render() {
        return(
            <div id="HomePage">
            <Container>
                <Row>
                <Col>
                    <Link to="/dashboard">
                        <MDBBtn color={"orange"} className="Button">Dashboard</MDBBtn>
                    </Link>
                </Col>
                </Row>
            </Container>
            </div>
        );
    }
};

export default HomePage;