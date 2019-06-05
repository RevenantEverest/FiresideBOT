import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EconomySettings.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';

//Services Imports
import currencyServices from '../../services/currencyServices';

class EconomySettings extends Component {

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
        if(!this._isMounted) return setTimeout(() => this.getSettings(), 2000);
        currencyServices.getSettings(this.state.manageServer.id)
        .then(settings => this.setState({ settings: settings.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.currency_increase_rate)
        if(!Number.isInteger(parseInt(this.state.currency_increase_rate, 10)))
        return this.setState({ formFailure: true, failureReason: "Increase Rate must be a number"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
        else if(parseInt(this.state.currency_increase_rate, 10) <= 0)
        return this.setState({ formFailure: true, failureReason: "Increase Rate must be above 0"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));

        currencyServices.updateSettings({
            guild_id: this.state.manageServer.id, 
            currency_name: (this.state.currency_name ? this.state.currency_name : this.state.settings.currency_name), 
            currency_increase_rate: (this.state.currency_increase_rate ? this.state.currency_increase_rate : this.state.settings.currency_increase_rate) 
        })
        .then(() => {
            this.getSettings();
            this.setState({ formSuccess: true }, () => setTimeout(() => this.setState({ formSuccess: false }), 2000));
        })
        .catch(err => console.error(err));
    }

    renderSettings() {
        return(
            <Form id="EconomySettings-Form" onSubmit={this.handleSubmit} autoComplete="off" fluid>
                <Form.Group controlId="formBasicsUsername">
                    <Form.Row>
                    <Col lg={3}>
                    <Form.Label>Currency Name: </Form.Label>
                    </Col>
                    <Col lg={3}>
                    <Form.Label>Increase Rate: </Form.Label>
                    </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={3}>
                        <Form.Control 
                        id="EconomySettings-CurrencyName" 
                        type="text" 
                        name="currency_name" 
                        placeholder={`${this.state.settings.currency_name}`} 
                        onChange={this.handleChange}
                        />
                        </Col>
                        <Col lg={3}>
                        <Form.Control 
                        id="EconomySettings-CurrencyIncreaseRate" 
                        type="text" 
                        name="currency_increase_rate" 
                        placeholder={`${this.state.settings.currency_increase_rate}`} 
                        onChange={this.handleChange}
                        />
                        </Col>
                        <Col lg={1}>
                        <Button id="EconomySettings-UpdateButton" variant="primary" type="submit">
                        Update
                        </Button>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={3}>
                        <Form.Text>
                        A name for your servers currency (ie. Souls)
                        </Form.Text>
                        </Col>
                        <Col lg={3}>
                        <Form.Text>
                        Desired replacement for this filter.
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
                    <h1 className="Component-Header">Economy</h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: "20px;" }}>
                <Col>
                    <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                    <Link to="/economy"><p className="Component-Breadcrumb">/ Economy </p></Link>
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
            <div id="EconomySettings">
                <Container id={window.location.pathname === "/economy/settings" ? "EconomySettings-Container" : ''} fluid>
                <Container>
                {window.location.pathname === "/economy/settings" ? this.renderBreadcrumb() : ''}
                <Row className="Component-Content" style={{ marginTop: "40px" }}>
                    <Col lg={5}>
                    {this.state.dataReceived ? this.renderSettings() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
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

export default EconomySettings;