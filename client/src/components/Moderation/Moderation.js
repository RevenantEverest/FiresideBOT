import React, { Component } from 'react';
import './Moderation.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import SendEmbed from '../SendEmbed/SendEmbed';

class Moderation extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderServerPicker() {
        return(
            <div>
                <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>
                <h5 className="h5" style={{ display: "inline-block", marginLeft: "2%" }}>Please Select A Server To Manage Before Continuing</h5>
            </div>
        );
    }

    render() {
        return(
            <div id="Moderation" style={{ marginBottom: "5%" }}>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Moderation</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Moderation</p>
                    </Col>
                </Row>
                {this.props.manageServer ? '' : this.renderServerPicker()}
                <Row>
                    <Col>
                        {this.props.manageServer ? <SendEmbed userData={this.props.userData} manageServer={this.props.manageServer} /> : ''}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Moderation;