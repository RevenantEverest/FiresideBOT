import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCollapse,
    MDBBtn
} from 'mdbreact';

import Breadcrumb from '../sections/Breadcrumb';
import SystemStatus from '../sections/SystemStatus';
import SystemOperations from '../sections/SystemOperations';

class Moderation extends Component {

    _Routes = [{ main: true, pathname: "Moderation" }];

    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    render() {
        return(
            <div id="Moderation" className="app-page">
                <Container fluid>
                <Breadcrumb routes={this._Routes} />
                <Row className="mt-4">
                    <Col>
                    <MDBCard>
                    <MDBCardHeader className="card-header pointer" onClick={this.toggleCollapse("SystemStatus")}>
                        System Status
                        <FontAwesomeIcon className="ml-2" icon="angle-right" />
                    </MDBCardHeader>
                    <MDBCollapse id={"SystemStatus"} isOpen={this.state.collapseID}>
                        <MDBCardBody className="card-body">
                            <SystemStatus />
                        </MDBCardBody>
                    </MDBCollapse>
                    </MDBCard>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                    <MDBCard>
                    <MDBCardHeader className="card-header pointer" onClick={this.toggleCollapse("SystemOperations")}>
                        System Operations
                        <FontAwesomeIcon className="ml-2" icon="angle-right" />
                    </MDBCardHeader>
                    <MDBCollapse id={"SystemOperations"} isOpen={this.state.collapseID}>
                        <MDBCardBody className="card-body">
                            <SystemOperations />
                        </MDBCardBody>
                    </MDBCollapse>
                    </MDBCard>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                    <MDBCard>
                    <MDBCardHeader className="card-header pointer" onClick={this.toggleCollapse("SendServerMessage")}>
                        Send Server Message
                        <FontAwesomeIcon className="ml-2" icon="angle-right" />
                    </MDBCardHeader>
                    <MDBCollapse id={"SendServerMessage"} isOpen={this.state.collapseID}>
                        <MDBCardBody className="card-body">
                            
                        </MDBCardBody>
                    </MDBCollapse>
                    </MDBCard>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                    <MDBCard>
                    <MDBCardHeader className="card-header pointer" onClick={this.toggleCollapse("BanUser")}>
                        Ban User
                        <FontAwesomeIcon className="ml-2" icon="angle-right" />
                    </MDBCardHeader>
                    <MDBCollapse id={"BanUser"} isOpen={this.state.collapseID}>
                        <MDBCardBody className="card-body">
                            
                        </MDBCardBody>
                    </MDBCollapse>
                    </MDBCard>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                    <MDBCard>
                    <MDBCardHeader className="card-header pointer" onClick={this.toggleCollapse("BanGuild")}>
                        Ban Guild
                        <FontAwesomeIcon className="ml-2" icon="angle-right" />
                    </MDBCardHeader>
                    <MDBCollapse id={"BanGuild"} isOpen={this.state.collapseID}>
                        <MDBCardBody className="card-body">
                            
                        </MDBCardBody>
                    </MDBCollapse>
                    </MDBCard>
                    </Col>
                </Row>
                <Row className="mt-4 mb-5">
                    <Col>
                    <MDBBtn color="elegant ml-0" size="md">
                        View All Bans
                    </MDBBtn>
                    <MDBBtn color="elegant" size="md">
                        View All Appeals
                    </MDBBtn>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Moderation;