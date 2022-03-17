import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';

//Component Imports
import GuildSettings from '../GuildSettings/GuildSettings';
import EconomySettings from '../Economy/EconomySettings/EconomySettings';
import RankSettings from '../Ranks/RankSettings/RankSettings';
import EditWelcomeMessage from '../EditWelcomeMessage/EditWelcomeMessage';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
    }

    renderSettings() {
        return(
            <Row style={{ marginBottom: "5%" }}>
            <Col lg={12} md={12} sm={12} xs={12} style={{ paddingLeft: 0, paddingRight: 0, marginBottom: "5%" }}>
                <MDBCard className="w-auto">
                <MDBCardBody style={{ background: "#1a1a1a" }}>
                    <MDBCardTitle tag="div">
                    <Col>
                    <h4 className="h4">Guild Settings</h4>
                    </Col>
                    </MDBCardTitle>
                    <GuildSettings userData={this.state.userData} manageServer={this.state.manageServer} />
                </MDBCardBody>
                </MDBCard>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} style={{ paddingLeft: 0, paddingRight: 0, marginBottom: "5%" }}>
                <MDBCard className="w-auto">
                <MDBCardBody style={{ background: "#1a1a1a" }}>
                    <MDBCardTitle tag="div">
                    <Col>
                    <h4 className="h4">Economy Settings</h4>
                    </Col>
                    </MDBCardTitle>
                    <EconomySettings userData={this.state.userData} manageServer={this.state.manageServer} />
                </MDBCardBody>
                </MDBCard>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} style={{ paddingLeft: 0, paddingRight: 0, marginBottom: "5%" }}>
                <MDBCard className="w-auto">
                <MDBCardBody style={{ background: "#1a1a1a" }}>
                    <MDBCardTitle tag="div">
                    <Col>
                    <h4 className="h4">Rank Settings</h4>
                    </Col>
                    </MDBCardTitle>
                    <RankSettings userData={this.state.userData} manageServer={this.state.manageServer} />
                </MDBCardBody>
                </MDBCard>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} style={{ paddingLeft: 0, paddingRight: 0, marginBottom: "5%" }}>
                <EditWelcomeMessage userData={this.state.userData} manageServer={this.state.manageServer} />
            </Col>
            </Row>
        );
    }

    renderSpinner() {
        if(!this.state.dataReceived && this.props.manageServer)
            return <Row><Col><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></Col></Row>;
        else if(!this.state.manageServer)
            return(
                <Row>
                <Col lg={1} style={{ paddingRight: 0 }}>
                <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>
                </Col>
                <Col style={{ paddingLeft: 0 }}>
                <h5 className="h5" style={{ display: "inline-block", marginLeft: "2%" }}>Please Select A Server To Manage Before Continuing</h5>
                </Col>
                </Row>
            );
    }

    render() {
        return(
            <div id="Settings" style={{ marginBottom: "5%" }}>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Settings</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Settings</p>
                    </Col>
                </Row>
                {this.state.manageServer ? this.renderSettings() : this.renderSpinner()}
                </Container>
            </div>
        );
    }
};

export default Settings;