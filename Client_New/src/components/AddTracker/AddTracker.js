import React, { Component } from 'react';
import './AddTracker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';

//Services Imports
import twitchTrackerServices from '../../services/twitchTrackerServices';

class AddTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer,
            channels: this.props.channels,
            roles: this.props.roles
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkString(str, arr) {
        const re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
        return re.test(str);
    }

    filter(str, arr, options) {
        let re = null;
        if(options.special) re = new RegExp(`\\b(?:${arr.join("|")})\\b|[^a-z0-9 ]`, "gi");
        else re = new RegExp(`\\b(?:${arr.join("|")})\\b`, "gi");

        return str.replace(re, '').replace(/ +/g, " ").trim();
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();
        const requestFilter = ['http://', 'https://', '.com', '.tv', 'twitch', 'www.', '/'];
        let streamer = this.state.streamer;
        this.checkString(streamer, requestFilter) ? streamer = this.filter(streamer, requestFilter, { special: false }) : streamer = this.state.streamer;

        if(!this.state.channel_id) 
            return this.setState({ formFailure: true, failureReason: "No Channel Selected" }, () => setTimeout(() => this.setState({ formFailure: false }), 2000));

        twitchTrackerServices.addTracker({ 
            guild_id: this.state.manageServer.id, streamer: streamer, 
            channel_id: this.state.channel_id, role_id: (this.state.role_id ? this.state.role_id : "none")
        })
        .then(tracker => {
            document.querySelector('#AddTracker-Form').reset();
            this.props.getTrackers();
            this.setState({ formSuccess: true }, () => setTimeout(() => this.setState({ formSuccess: false }), 2000))
        })
        .catch(err => console.error(err));
    }

    renderForm() {

        let Channels = this.state.channels.map((el, idx) => {
            return(<option value={`${el.id}`} key={idx}>{el.name}</option>)
        });

        let Roles = this.state.roles.map((el, idx) => {
            return(<option value={`${el.id}`} key={idx}>{el.name}</option>)
        });

        return(
            <Form id="AddTracker-Form" onSubmit={this.handleSubmit} autoComplete="off">
            <Form.Group>
                <Form.Row>
                <Col lg={4}>
                <Form.Label>Streamer: </Form.Label>
                </Col>
                <Col lg={4}>
                <Form.Label>Channel: </Form.Label>
                </Col>
                <Col lg={4}>
                <Form.Label>Role: </Form.Label>
                </Col>
                </Form.Row>
                <Form.Row>
                    <Col lg={4}>
                    <Form.Control 
                    id="AddTracker-Streamer" 
                    type="text" 
                    name="streamer"
                    onChange={this.handleChange}
                    />
                    </Col>
                    <Col lg={3}>
                    <Form.Control 
                    as="select"
                    id="AddTracker-Channel" 
                    name="channel_id" 
                    onChange={this.handleChange}>
                        <option>Select Channel</option>
                        {Channels}
                    </Form.Control>
                    </Col>
                    <Col lg={3}>
                    <Form.Control 
                    as="select"
                    id="AddTracker-Role" 
                    name="role_id" 
                    onChange={this.handleChange}>
                        <option value="none">No Role</option>
                        {Roles}
                    </Form.Control>
                    </Col>
                    <Col lg={1}>
                    <Button id="AddTracker-SubmitButton" variant="primary" type="submit">
                    Add
                    </Button>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col lg={4}>
                    <Form.Text>
                    Name of streamer or Twitch Link.
                    </Form.Text>
                    </Col>
                    <Col lg={3}>
                    <Form.Text>
                    Channel tracker will be posted in.
                    </Form.Text>
                    </Col>
                    <Col lg={3}>
                    <Form.Text>
                    Desired role to be tagged when tracker is posted (Optional).
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
                Tracker Added!
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
            <div id="AddTracker">
            <Container>
            <Row>
                <Col>
                {this.renderForm()}
                </Col>
                {this.state.formSuccess ? this.renderSuccess() : ''}
                {this.state.formFailure ? this.renderFailure() : ''}
            </Row>
            </Container>
            </div>
        );
    }
};

export default AddTracker;