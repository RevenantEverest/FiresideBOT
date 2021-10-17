import React from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col
} from 'mdbreact';

import { HomeHeader } from '../../components/Home';

function HomePage() {
    return(
        <div id="HomePage">
            <Container className="pl-0 pr-0 overflow-hidden" fluid>
            <Row>
                <Col>
                    <HomeHeader />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="mt-5 mb-5" />
                </Col>
            </Row>
            </Container>
        </div>
    );
};

export default HomePage;