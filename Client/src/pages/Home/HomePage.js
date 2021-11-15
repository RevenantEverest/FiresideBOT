import React from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col
} from 'mdbreact';

import { HomeHeader } from '../../components/Home';
import { WhyChooseUs, WhatWeOffer } from '../../components/Features';

function HomePage({ api }) {

    return(
        <div id="HomePage">
            <Container className="pl-0 pr-0 overflow-hidden" fluid>
            <HomeHeader api={api} />
            <Row className="my-5">
                <Col>
                <WhyChooseUs />
                </Col>
            </Row>
            <Row className="my-5">
                <Col>
                <WhatWeOffer />
                </Col>
            </Row>
            </Container>
        </div>
    );
};

export default HomePage;