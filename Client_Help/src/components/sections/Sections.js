import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBIcon, MDBBtn } from 'mdbreact';

class Sections extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const commands = this.props.commands ? this.props.commands : null;
        return(
            <div id="Sections">
                <Container>
                <section className="my-5">
                <h2 className="h1-responsive font-weight-bold text-center my-5">
                    Need Help?
                </h2>
                <p className="lead grey-text w-responsive text-center mx-auto mb-5">
                    View the extensive documentation of our {commands ? commands.length : 100} commands! Or learn what it takes to 
                    get Fireside up and running. Whatever you need, we can help!
                </p>
                <Row style={{ marginTop: "5%" }}>
                    <Col md="4" className="md-0 mb-5">
                    <Row>
                        <Col lg="2" md="3" size="2">
                        <MDBIcon icon="bullhorn" size="2x" className="fireside-text" />
                        </Col>
                        <Col lg="10" md="9" size="10">
                        <h4 className="font-weight-bold">What's New</h4>
                        <p>
                            Stay up to date on new features, and what's going on in the Fireside community!
                        </p>
                        <Link to="/whatsnew">
                            <MDBBtn className="Button" size="sm">Learn more</MDBBtn>
                        </Link>
                        </Col>
                    </Row>
                    </Col>
                    <Col md="4" className="md-0 mb-5">
                    <Row>
                        <Col lg="2" md="3" size="2">
                        <MDBIcon icon="magic" size="2x" className="fireside-text" />
                        </Col>
                        <Col lg="10" md="9" size="10">
                        <h4 className="font-weight-bold">Commands</h4>
                        <p>
                            Confused on how to use a command? Check out our extensive command documentation.
                        </p>
                        <Link to="/commands">
                            <MDBBtn className="Button" size="sm">Learn more</MDBBtn>
                        </Link>
                        </Col>
                    </Row>
                    </Col>
                    <Col md="4" className="md-0 mb-5">
                    <Row>
                        <Col lg="2" md="3" size="2">
                        <MDBIcon icon="tasks" size="2x" className="fireside-text" />
                        </Col>
                        <Col lg="10" md="9" size="10">
                        <h4 className="font-weight-bold">Getting Started</h4>
                        <p>
                            Setting up Fireside can be challenging, let us walk you through it in our Getting Started section.
                        </p>
                        <Link to="/gettingstarted">
                            <MDBBtn className="Button" size="sm">Learn more</MDBBtn>
                        </Link>
                        </Col>
                    </Row>
                    </Col>
                    <Col md="4" className="md-0 mb-5">
                    <Row>
                        <Col lg="2" md="3" size="2">
                        <MDBIcon icon="question-circle" size="2x" className="fireside-text" />
                        </Col>
                        <Col lg="10" md="9" size="10">
                        <h4 className="font-weight-bold">FAQ</h4>
                        <p>
                            See what others are asking, and enjoy a 5 course meal of self-serve problem solving.
                        </p>
                        <Link to="/faq">
                            <MDBBtn className="Button" size="sm">Learn more</MDBBtn>
                        </Link>
                        </Col>
                    </Row>
                    </Col>
                    <Col md="4" className="md-0 mb-5">
                    <Row>
                        <Col lg="2" md="3" size="2">
                        <MDBIcon icon="gem" size="2x" className="fireside-text" />
                        </Col>
                        <Col lg="10" md="9" size="10">
                        <h4 className="font-weight-bold">Premium</h4>
                        <p>
                            Interested in how to get the most out of Fireside? Or just want to show your support, while upping your street cred?
                            Check out what Fireside Premium has to offer.
                        </p>
                        <Link to="/premium">
                            <MDBBtn className="Button" size="sm">Learn more</MDBBtn>
                        </Link>
                        </Col>
                    </Row>
                    </Col>
                    <Col md="4" className="md-0 mb-5">
                    <Row>
                        <Col lg="2" md="3" size="2">
                        <MDBIcon icon="hands-helping" size="2x" className="fireside-text" />
                        </Col>
                        <Col lg="10" md="9" size="10">
                        <h4 className="font-weight-bold">Support Server</h4>
                        <p>
                            Need more help than what's available here? Join our Support Server!
                        </p>
                        <MDBBtn className="Button" size="sm" tag="a" target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">Learn more</MDBBtn>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                </section>
                </Container>
            </div>
        );
    }
};

export default Sections;