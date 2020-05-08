import React, { Component } from 'react';
import './AddTracker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBSelect,
    MDBTooltip,
    MDBInput,
    MDBBtn,
    toast,
    ToastContainer
} from 'mdbreact';

//Services Imports
import twitchTrackerServices from '../../../services/twitchTrackerServices';

import Skin from '../../../res/Skin';

class AddTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channels: this.props.channels.map(el => { return { text: el.name, value: el.id } }),
            roles: this.props.roles.map(el => { return { text: el.name, value: el.id } })
        }
        this.handleChannelSelectChange = this.handleChannelSelectChange.bind(this);
        this.handleRoleSelectChange = this.handleRoleSelectChange.bind(this);
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

    handleChannelSelectChange = (value) => this.setState({ "channel_id": value[0] });
    handleRoleSelectChange = (value) => this.setState({ "role_id": value[0] });

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const requestFilter = ['http://', 'https://', '.com', '.tv', 'twitch', 'www.', '/'];
        let streamer = this.state.streamer;
        this.checkString(streamer, requestFilter) ? streamer = this.filter(streamer, requestFilter, { special: false }) : streamer = this.state.streamer;

        if(!this.state.streamer) return this.toggleFailureNotify("Streamer Field Empty");
        else if(!this.state.channel_id) return this.toggleFailureNotify("No Channel Selected");
        else if(this.props.streamers.includes(this.state.streamer))
            return this.toggleFailureNotify("Streamer Already Added");

        let data = {
            guild_id: this.props.manageServer.id,
            streamer: streamer.toLowerCase(),
            channel_id: this.state.channel_id,
            role_id: this.state.role_id ? this.state.role_id : "none",
            flavor_text: this.state.flavor_text ? this.state.flavor_text : ""
        };

        twitchTrackerServices.addTracker(data)
        .then(() => {
            this.toggleSuccessNotify();
            this.props.toggleModal();
            this.props.getTrackers();
        })
        .catch(err => this.toggleFailureNotify(err.response ? err.response.status === 404 ? err.response.data : "" : ""));
    }

    toggleSuccessNotify = () => toast.success("Created Successfully", { position: "top-right", autoClose: 5000 });
    toggleFailureNotify = (reason) => toast.error(`ERROR: ${reason}`, { position: "top-right", autoClose: 5000 });

    renderForm() {
        return(
            <form onSubmit={this.handleSubmit}>
                <Container>
                <Row className="mb-5">
                <Col lg={4}>
                    <Row>
                        <Col lg={4} style={{ paddingRight: 0 }}>
                            <label>Streamer</label>
                        </Col>
                        <Col lg={8}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The username of the streamer you'd like to track.</span>
                            </MDBTooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={10} id="AddTracker-Input-Col">
                            <MDBInput 
                            name="streamer"
                            type="text" 
                            onChange={this.handleChange} 
                            />
                        </Col>
                    </Row>
                </Col>
                </Row>
                <Row className="mb-5">
                <Col lg={4}>
                    <Row>
                        <Col lg={4} style={{ paddingRight: 0 }}>
                            <label>Flavor Text</label>
                        </Col>
                        <Col lg={8}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Optional text to be added when a notification is posted. Allows custom variables.</span>
                            </MDBTooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={10} id="AddTracker-Input-Col">
                            <MDBInput 
                            name="flavor_text"
                            type="text" 
                            onChange={this.handleChange} 
                            />
                        </Col>
                    </Row>
                </Col>
                </Row>
                <Row className="mb-5">
                    <Col lg={4}>
                        <Row>
                        <Col lg={4} style={{ paddingRight: 0 }}>
                            <label>Channel</label>
                        </Col>
                            <Col lg={6}>
                                <MDBTooltip domElement tag="span" placement="right">
                                    <span><FontAwesomeIcon icon="question-circle" /></span>
                                    <span>The text channel you'd like your notification to be posted in.</span>
                                </MDBTooltip>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} id="AddTracker-Output-Col">
                                <MDBSelect
                                search
                                options={this.state.channels}
                                selected="Choose a text channel"
                                getValue={this.handleChannelSelectChange}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col lg={4}>
                        <Row>
                        <Col lg={4} style={{ paddingRight: 0 }}>
                            <label>Roles</label>
                        </Col>
                            <Col lg={6}>
                                <MDBTooltip domElement tag="span" placement="right">
                                    <span><FontAwesomeIcon icon="question-circle" /></span>
                                    <span>Optional role to tag when the notification is posted.</span>
                                </MDBTooltip>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} id="AddTracker-Output-Col">
                                <MDBSelect
                                search
                                options={this.state.roles}
                                selected="Choose a role"
                                getValue={this.handleRoleSelectChange}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MDBBtn color="elegant" size="md" onClick={() => this.props.toggleModal()}>Close</MDBBtn>
                        <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} size="md" onClick={this.handleSubmit}>Create</MDBBtn>
                    </Col>
                </Row>
                </Container>
            </form>
        );
    }

    render() {
        return(
            <div id="AddTracker">
                <ToastContainer position="top-right" autoClose={5000} newestOnTop rtl={false} />
                {this.renderForm()}
            </div>
        );
    }
};

export default AddTracker;