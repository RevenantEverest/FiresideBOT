import React from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBAnimation
} from 'mdbreact';

import { HomeHeader } from '../../components/Home';
import { WhyChooseUs, WhatWeOffer } from '../../components/Features';
import { Testimonials } from '../../components/Testimonials';

function HomePage({ api }) {

    return(
        <div id="HomePage">
            <Container className="pl-0 pr-0 overflow-hidden" fluid>
            <HomeHeader api={api} />
            <Row className="my-5">
                <Col>
                <MDBAnimation reveal type="fadeInUp" duration="1s">
                    <WhyChooseUs />
                </MDBAnimation>
                </Col>
            </Row>
            <Row className="my-5">
                <Col>
                <MDBAnimation reveal type="fadeInUp" duration="1s">
                    <WhatWeOffer />
                </MDBAnimation>
                </Col>
            </Row>
            <Row className="my-5">
                <Col>
                    <Testimonials />
                </Col>
            </Row>
            </Container>
        </div>
    );
};

export default HomePage;