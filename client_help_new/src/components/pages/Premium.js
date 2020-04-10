import React, { Component } from 'react';

import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBBtn
} from 'mdbreact';

class Premium extends Component {

    render() {
        return(
            <div id="Premium" className="black-skin">
                <Helmet>
                    <title>FiresideBOT | Premium</title>
                    <meta name="theme-color" content="#ff9900" />
                    <meta property="og:image" content="https://i.imgur.com/efYsW7T.png" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="FiresideBOT | Premium" />
                    <meta property="og:description" content="Want to get the most out of Fireside? Learn what Fireside Premium has to offer!" />
                    <meta property="og:url" content="https://firesidebot.com" />
                    <meta property="og:site_name" content="FiresideBOT | Discord Bot" />
                </Helmet>
                <Container>
                <Row>
                    <Col>
                    <section className="text-center my-5">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Our pricing plans
                    </h2>
                    <p className="grey-text text-center w-responsive mx-auto mb-5">
                        Premium is still currently in development. You can view the planned features and pricing below.
                        Check back frequently to stay up to date on the release and addition of new premium features!
                    </p>
                    <Row>
                        <Col lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBCard pricing>
                            <MDBCardBody style={{ background: "#1a1a1a", height: "850px" }}>
                            <h5 className="font-weight-bold mt-3">User Premium</h5>
                            <div className="price pt-0">
                                <h2 className="number mb-0">5</h2>
                            </div>
                            <ul className="striped mb-1">
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Request Length
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Length For Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Double</strong> Embers In Each Daily
                                    </p>
                                </li>
                            </ul>
                            <MDBBtn color="elegant" className="mb-4" disabled>
                                Select
                            </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                        </Col>
                        <Col lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBCard
                            className="card-image"
                            style={{
                            backgroundImage:
                                'url("https://i.imgur.com/OrxckTo.png")'
                            }}
                        >
                            <div className="text-white text-center pricing-card d-flex align-items-center rgba-black-strong py-3 px-3 rounded">
                            <MDBCardBody>
                                <h5 className="font-weight-bold mt-2">User & Server Premium</h5>
                                <div className="price pt-0 deep-orange-text">
                                <h2 className="number mb-0">10</h2>
                                </div>
                                <ul className="striped mb-0">
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Request Length
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Length For Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Double</strong> Embers In Each Daily
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Server Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Length For Server Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Server Ranks
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Custom Commands
                                    </p>
                                </li>
                                </ul>
                                <MDBBtn className="Button" disabled>
                                Select
                                </MDBBtn>
                            </MDBCardBody>
                            </div>
                        </MDBCard>
                        </Col>
                        <Col lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBCard pricing>
                            <MDBCardBody style={{ background: "#1a1a1a", height: "850px" }}>
                            <h5 className="font-weight-bold mt-3">Server Premium</h5>
                            <div className="price pt-0">
                                <h2 className="number mb-0">5</h2>
                            </div>
                            <ul className="striped mb-1">
                                <li>
                                <p>
                                    <strong>Unlimited</strong> Server Playlists
                                </p>
                                </li>
                                <li>
                                <p>
                                    <strong>Unlimited</strong> Song Length For Server Playlists
                                </p>
                                </li>
                                <li>
                                <p>
                                    <strong>Unlimited</strong> Server Ranks
                                </p>
                                </li>
                                <li>
                                <p>
                                    <strong>Unlimited</strong> Custom Commands
                                </p>
                                </li>
                            </ul>
                            <MDBBtn color="elegant" className="mb-4" disabled>
                                Select
                            </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                        </Col>
                    </Row>
                    </section>
                    </Col>
                </Row>
                {/* <Row style={{ marginBottom: "5%" }}>
                    <Col>
                    <PremiumFAQ />
                    </Col>
                </Row> */}
                </Container>
            </div>
        );
    }
};

export default Premium;