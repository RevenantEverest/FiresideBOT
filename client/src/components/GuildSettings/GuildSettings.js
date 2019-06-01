import React, { Component } from 'react';
import './GuildSettings.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';

//Services Imports
import guildServices from '../../services/GuildServices/guildServices';

class GuildSettings extends Component {

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

    getSettings() {
        if(!this._isMounted) return setTimeout(() => this.getSettings(), 2000);
        guildServices.getGuildSettings(this.state.manageServer.id)
        .then(settings => this.setState({ settings: settings.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();
        guildServices.updateSettings({ guild_id: this.state.manageServer.id, prefix: (this.state.prefix ? this.state.prefix : this.settings.prefix) })
        .then(() => {
            this.getSettings();
            this.setState({ formSuccess: true }, () => setTimeout(() => this.setState({ formSuccess: false }), 2000));
        })
        .catch(err => console.error(err));
    }

    renderSettings() {
        return(
            <Form id="GuildSettings-Form" onSubmit={this.handleSubmit} autoComplete="off" fluid>
                <Form.Group controlId="formBasicsUsername">
                    <Form.Row>
                    <Col lg={3}>
                    <Form.Label>Prefix: </Form.Label>
                    </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={3}>
                        <Form.Control 
                        id="GuildSettings-CurrencyName" 
                        type="text" 
                        name="prefix" 
                        placeholder={`${this.state.settings.prefix}`} 
                        onChange={this.handleChange}
                        />
                        </Col>
                        <Col lg={1}>
                        <Button id="GuildSettings-UpdateButton" variant="primary" type="submit">
                        Update
                        </Button>
                        </Col>
                    </Form.Row>
                    <Form.Row>
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
            <div id="GuildSettings">
                <Container fluid id="GuildSettings-ContainerMain">
                    <Container id="GuildSettings-Container">
                    <Row>
                    <Col lg={4}>
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

export default GuildSettings;