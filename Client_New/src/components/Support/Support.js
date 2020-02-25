import React, { Component } from 'react';
import './Support.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBBtn } from 'mdbreact';

import Skin from '../../res/Skin';

class Support extends Component {

    _helpLink = `https://help.firesidebot.com`;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div id="Support">
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Support</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Support</p>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                    <h5 className="h5">
                    This area is currently under construction. In the meantime please visit our Help Documentation or get immidiate support by joining
                    our Support Server
                    </h5>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col lg={2}>
                    <MDBBtn color={Skin.hex} className="Button" size="md" tag="a" target="_blank" rel="noopener noreferrer" href={this._helpLink}>
                        Help Docs
                    </MDBBtn>
                    </Col>
                    <Col lg={2}>
                    <MDBBtn color={Skin.hex} className="Button" size="md" tag="a" target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                        Support Server
                    </MDBBtn>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Support;