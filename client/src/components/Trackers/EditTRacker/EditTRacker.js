import React, { Component } from 'react';
import './EditTracker.css';

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

import twitchTrackerServices from '../../../services/twitchTrackerServices';

import Skin from '../../../res/Skin';

class EditTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channels: this.props.channels.map(el => { return { text: el.name, value: el.id } }),
            roles: this.props.roles.map(el => { return { text: el.name, value: el.id } })
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if(this._isMounted) {
            let roles = this.state.roles;
            roles.push({ text: "none", value: "none" });
            this.setState({ roles: roles });
        }
    }

    componentWillUnmount = () => this._isMounted = false;

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleChannelSelectChange = (value) => this.setState({ "channel_id": value[0] });
    handleRoleSelectChange = (value) => this.setState({ "role_id": value[0] });

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            id: this.props.tracker.id,
            guild_id: this.props.manageServer.id,
            twitch_username: this.props.tracker.twitch_username,
            twitch_id: this.props.tracker.twitch_id,
            channel_id: this.state.channel_id ? this.state.channel_id : this.props.tracker.channel_id,
            role_id: this.state.role_id ? this.state.role_id : "none",
            flavor_text: this.state.flavor_text ? this.state.flavor_text : this.props.tracker.flavor_text
        };

        twitchTrackerServices.editTracker(data)
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
                <Container fluid>
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
                <Col lg={6}>
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
                            selected={this.props.channelName}
                            getValue={this.handleChannelSelectChange}
                            />
                        </Col>
                    </Row>
                </Col>
                </Row>
                <Row className="mb-5">
                <Col lg={6}>
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
                            selected={this.props.roleName}
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
            <div id="EditTracker">
                <ToastContainer position="top-right" autoClose={5000} newestOnTop rtl={false} />
                {this.renderForm()}
            </div>
        );
    }
};

export default EditTracker;