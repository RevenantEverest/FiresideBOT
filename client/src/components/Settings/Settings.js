import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

import { Container, Row, Col, Spinner } from 'react-bootstrap';

//Component Imports
import GuildSettings from '../GuildSettings/GuildSettings';
import EconomySettings from '../EconomySettings/EconomySettings';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
    }

    render() {
        return(
            <div id="Settings">
                <Container fluid className="Settings-ContainerMain">
                    <Container className="Settings-Container">
                    <Row>
                        <Col>
                            <h1 className="Component-Header">Settings</h1>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "20px;" }}>
                        <Col>
                            <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                            <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Settings</p>
                        </Col>
                    </Row>
                    <Row className="Component-Content" style={{ marginTop: "40px" }}>
                        <Col>
                        {this.state.manageServer ? '' : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                        {this.state.manageServer ? <GuildSettings userData={this.state.userData} manageServer={this.state.manageServer} /> : ''}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        {this.state.manageServer ? <EconomySettings userData={this.state.userData} manageServer={this.state.manageServer} /> : ''}
                        </Col>
                    </Row>
                    </Container>
                </Container>
            </div>
        );
    }
};

export default Settings;