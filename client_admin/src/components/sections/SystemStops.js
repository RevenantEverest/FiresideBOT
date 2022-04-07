import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBBtn,
    toast
} from 'mdbreact';

import systemServices from '../../services/systemServices';

class SystemStops extends Component {

    constructor() {
        super();
        this.state = {};
    }

    handleActivate(el) {
        this.setState({ [el + "_activated"]: true });
        let systemCall = null;

        switch(el) {
            case "full":
                systemCall = [systemServices.stop()];
                break;
            case "api":
                systemCall = [systemServices.stopService("API")];
                break;
            case "background":
                systemCall = [systemServices.stopService("Background")];
                break;
            case "dbl":
                systemCall = [systemServices.stopService("DBL")];
                break;
            case "discord":
                systemCall = [systemServices.stopService("Discord")];
                break;
            case "logger":
                systemCall = [systemServices.stopService("Logger")];
                break;
            case "tt":
                systemCall = [systemServices.stopService("TwitchTracker")];
                break;
            default:
                break;
        }

        if(!systemCall) return this.setState({ [el + "_activated"]: false });

        Promise.all(systemCall)
        .then(() => this.setState({ [el + "_activated"]: false }, () => this.toggleSuccessNotify()))
        .catch(err => {
            this.setState({ [el + "_activated"]: false }, () => this.toggleFailureNotify("Stop Failed"));
            return console.error(err);
        });
    }

    toggleFailureNotify = (reason) => toast.error(`${reason}`, { position: "top-center", autoClose: 5000 });
    toggleSuccessNotify = () => toast.success("Stopped Successfully", { position: "top-center", autoClose: 5000 });

    renderSpinner() {
        return(
            <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    render() {
        return(
            <div className="SystemOperations">
                <Container fluid>
                <Row className="mb-2">
                    <Col>
                    <h4 className="h4">Stops</h4>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                    <MDBBtn 
                    color="" 
                    className="red accent-4 ml-0 wp-200" 
                    size="md"
                    disabled={this.state.full_activated ? true : false}
                    onClick={() => this.handleActivate("full")}>
                        {!this.state.full_activated ? "Full Stop" : this.renderSpinner()}
                    </MDBBtn>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                    <MDBBtn 
                    color="" 
                    className="red accent-4 ml-0 wp-200" 
                    size="md"
                    disabled={this.state.api_activated ? true : false}
                    onClick={() => this.handleActivate("api")}>
                        {!this.state.api_activated ? "API Stop" : this.renderSpinner()}
                    </MDBBtn>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <MDBBtn 
                    color="" 
                    className="red accent-4 ml-0 wp-200" 
                    size="md"
                    disabled={this.state.background_activated ? true : false}
                    onClick={() => this.handleActivate("background")}>
                        {!this.state.background_activated ? "Background Stop" : this.renderSpinner()}
                    </MDBBtn>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <MDBBtn 
                    color="" 
                    className="red accent-4 ml-0 wp-200" 
                    size="md"
                    disabled={this.state.dbl_activated ? true : false}
                    onClick={() => this.handleActivate("dbl")}>
                        {!this.state.dbl_activated ? "DBL Stop" : this.renderSpinner()}
                    </MDBBtn>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <MDBBtn 
                    color="" 
                    className="red accent-4 ml-0 wp-200" 
                    size="md"
                    disabled={this.state.discord_activated ? true : false}
                    onClick={() => this.handleActivate("discord")}>
                        {!this.state.discord_activated ? "Discord Stop" : this.renderSpinner()}
                    </MDBBtn>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <MDBBtn 
                    color="" 
                    className="red accent-4 ml-0 wp-200"
                    size="md"
                    disabled={this.state.logger_activated ? true : false}
                    onClick={() => this.handleActivate("logger")}>
                        {!this.state.logger_activated ? "Logger Stop" : this.renderSpinner()}
                    </MDBBtn>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <MDBBtn 
                    color="" 
                    className="red accent-4 ml-0 wp-200" 
                    size="md"
                    disabled={this.state.tt_activated ? true : false}
                    onClick={() => this.handleActivate("tt")}>
                        {!this.state.tt_activated ? "TwitchTracker Stop" : this.renderSpinner()}
                    </MDBBtn>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default SystemStops;