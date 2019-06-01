import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RankSettings.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Button, Form, Alert, Spinner } from 'react-bootstrap';

//Services Imports
import rankServices from '../../services/rankServices';

class RankSettings extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getSettings();
    }

    componentWillUnmount = () => this._isMounted = false;

    getSettings() {
        if(!this._isMounted) return setTimeout(() => this.getSettings, 2000);
        if(!this.state.manageServer) return;
        rankServices.getRankSettings(this.state.manageServer.id)
        .then(settings => this.setState({ settings: settings.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.general_increase_rate)
            if(!Number.isInteger(parseInt(this.state.general_increase_rate, 10)))
            return this.setState({ formFailure: true, failureReason: "General Increase Rate must be a number"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
            else if(parseInt(this.state.general_increase_rate, 10) <= 0)
            return this.setState({ formFailure: true, failureReason: "General Increase Rate must be above 0"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));

        if(this.state.complexity)
            if(!Number.isInteger(parseInt(this.state.complexity, 10)))
            return this.setState({ formFailure: true, failureReason: "Complexity must be a number"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
            else if(parseInt(this.state.complexity, 10) <= 0)
            return this.setState({ formFailure: true, failureReason: "Complexity must be above 0"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
            else if(parseInt(this.state.complexity, 10) > 10)
            return this.setState({ formFailure: true, failureReason: "Complexity must be 10 or below"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));

        rankServices.updateRankSettings({
            guild_id: this.state.manageServer.id, 
            general_increase_rate: (this.state.general_increase_rate ? this.state.general_increase_rate : this.state.settings.general_increase_rate)
        })
        .then(() => {
            this.getSettings();
            this.setState({ formSuccess: true }, () => setTimeout(() => this.setState({ formSuccess: false }), 2000));
        })
        .catch(err => console.error(err));
    }

    renderSettings() {
        return(
            <Form id="RanksSettings-Form" onSubmit={this.handleSubmit} autoComplete="off" fluid>
                <Form.Group controlId="formBasicsUsername">
                    <Form.Row>
                    <Col lg={4}>
                    <Form.Label>General Increase Rate: </Form.Label>
                    </Col>
                    <Col lg={4}>
                    <Form.Label>Complexity: </Form.Label>
                    </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={4}>
                        <Form.Control 
                        id="RankSettings-GIR" 
                        type="text" 
                        name="general_increase_rate" 
                        placeholder={`${this.state.settings.general_increase_rate}`} 
                        onChange={this.handleChange}
                        />
                        </Col>
                        <Col lg={4}>
                        <Form.Control 
                        id="RankSettings-Complexity" 
                        type="text" 
                        name="complexity" 
                        placeholder={`${this.state.settings.complexity}`} 
                        onChange={this.handleChange}
                        />
                        </Col>
                        <Col lg={1}>
                        <Button id="RankSettings-UpdateButton" variant="primary" type="submit">
                        Update
                        </Button>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={4}>
                        <Form.Text>
                        Desired XP increase rate (per message).
                        </Form.Text>
                        </Col>
                        <Col lg={4}>
                        <Form.Text>
                        Determines how easy it is to rank up (1 to 10).
                        </Form.Text>
                        </Col>
                    </Form.Row>
                </Form.Group>
            </Form>
        );
    }

    renderBreadcrumb() {
        return(
            <div>
            <Row>
                <Col>
                    <h1 className="Component-Header">Rank Settings</h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: "20px;" }}>
                <Col>
                    <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                    <Link to="/ranks"><p className="Component-Breadcrumb">/ Ranks </p></Link>
                    <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Settings</p>
                </Col>
            </Row>
            </div>
        );
    }

    renderSuccess() {
        return(
            <Col lg={4}>
                <Alert variant="success" style={{ marginTop: "25px" }}>
                Settings Updated!
                <FontAwesomeIcon className="FontAwesomeIcon AddPlaylist-Alert-Close" icon="times" onClick={() => this.setState({ formSuccess: false })} />
                </Alert>    
            </Col>
        );
    }

    renderFailure() {
        return(
            <Col lg={4}>
                <Alert variant="danger" style={{ marginTop: "25px" }}>
                {this.state.failureReason}
                <FontAwesomeIcon className="FontAwesomeIcon AddPlaylist-Alert-Close" icon="times" onClick={() => this.setState({ formFailure: false })} />
                </Alert>    
            </Col>
        );
    }

    render() {
        return(
            <div id="RankSettings">
            <Container fluid id={window.location.pathname === "/ranks/settings" ? "RankSettings-Container" : ''}>
                <Container>
                {window.location.pathname === "/ranks/settings" ? this.renderBreadcrumb() : ''}
                <Row className="Component-Content" style={{ marginTop: "50px" }}>
                    <Col lg={5}>
                    {this.state.manageServer ? '' : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    {this.state.dataReceived ? this.renderSettings() : ''}
                    </Col>
                    {this.state.formSuccess ? this.renderSuccess() : ''}
                    {this.state.formFailure ? this.renderFailure() : ''}
                </Row>
                </Container>
            </Container>
            </div>
        );
    }
};

export default RankSettings;