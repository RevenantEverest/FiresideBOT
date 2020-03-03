import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Trackers.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import {
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBBtn
} from 'mdbreact';

import AddTracker from './AddTracker/AddTracker';
import EditTracker from './EditTRacker/EditTRacker';

import discordServices from '../../services/discordServices';
import twitchTrackerServices from '../../services/twitchTrackerServices';

import Skin from '../../res/Skin';

class Trackers extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.getTrackers = this.getTrackers.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getTrackers()
    }

    componentWillUnmount = () => this._isMounted = false;

    toggleModal = (modal, idx) => () => {
        let modalNumber = modal + idx;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    findModal = (modal, index) => this.state[(modal + index)];

    getTrackers() {
        if(!this._isMounted) return setTimeout(() => this.getTrackers(), 2000);
        if(!this.state.manageServer) return;
        twitchTrackerServices.getTrackers(this.state.manageServer.id)
        .then(trackers => this.getGuildChannels(trackers.data.data))
        .catch(err => console.error(err));
    }

    getGuildChannels(trackers) {
        discordServices.getGuildChannels(this.state.manageServer.id)
        .then(channels => this.getGuildRoles(trackers, channels.data.data))
        .catch(err => console.error(err));
    }

    getGuildRoles(trackers, channels) {
        discordServices.getGuildRoles(this.state.manageServer.id)
        .then(roles => this.setState({ trackers: trackers, channels: channels, roles: roles.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    deleteTracker(el, modalIndex) {
        twitchTrackerServices.removeTracker(el.id)
        .then(() => this.setState({ [`delete${modalIndex}`]: false }, () => this.getTrackers()))
        .catch(err => console.error(err))
    }

    renderServerPicker() {
        return(
            <div>
                <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>
                <h5 className="h5" style={{ display: "inline-block", marginLeft: "2%" }}>Please Select A Server To Manage Before Continuing</h5>
            </div>
        );
    }

    renderTrackers() {
        let channels = this.state.channels;
        let roles = this.state.roles;
        let Trackers = this.state.trackers.map((el, idx) => {
            if(!el.channel_id) return(<tr key={idx}></tr>)
            let ChannelName = channels.filter(channel => channel.id === el.channel_id)[0].name;
            let RoleName = el.role_id === "none" ? "none" : (el.role_id === "@everyone" ? "@everyone" : roles.filter(role => role.id === el.role_id)[0].name);
            return(
                <tr key={idx}>
                    <td className="Trackers-TD Trackers-TD-#">{idx + 1}</td>
                    <td className="Trackers-TD Trackers-TD-Username">
                        {el.twitch_username}
                    </td>
                    <td className="Trackers-TD Trackers-TD-Channel">{ChannelName}</td>
                    <td className="Trackers-TD Trackers-TD-Role">{RoleName}</td>
                    <td className="Trackers-TD Trackers-TD-Action">
                    <Container>
                    <Row>
                        <Col lg={6}>
                            <MDBBtn color="elegant" size="sm" onClick={this.toggleModal("edit", (idx + 1))}>
                            <FontAwesomeIcon className="CustomCommands-Icon-Trash" icon="edit" />
                            </MDBBtn>
                        </Col>
                        <Col lg={6}>
                            <MDBBtn color="elegant" size="sm" onClick={this.toggleModal("delete", (idx + 1))}>
                            <FontAwesomeIcon className="CustomCommands-Icon-Trash" icon="trash-alt" />
                            </MDBBtn>
                        </Col>
                    </Row>
                    </Container>
                    </td>

                    <MDBModal isOpen={this.findModal("delete", (idx + 1))} toggle={this.toggleModal("delete", (idx + 1))} centered>
                    <MDBModalHeader toggle={this.toggleModal("delete", (idx + 1))} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Are you sure you want to delete the Tracker for </h4>
                    <h4 className="h4 display-inline orange-text">{el.twitch_username}</h4>
                    <h4 className="h4 display-inline">?</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <MDBBtn color="elegant" onClick={this.toggleModal("delete", (idx + 1))}>Close</MDBBtn>
                        <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} onClick={() => this.deleteTracker(el, (idx + 1))}>Delete</MDBBtn>
                    </MDBModalBody>
                    </MDBModal>
                    
                    <MDBModal isOpen={this.findModal("edit", (idx + 1))} toggle={this.toggleModal("edit", (idx + 1))} size="lg">
                    <MDBModalHeader toggle={this.toggleModal("edit", (idx + 1))} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Edit Tracker </h4>
                    <h4 className="h4 display-inline orange-text">{el.twitch_username}</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <EditTracker
                        userData={this.state.userData}
                        manageServer={this.props.manageServer}
                        tracker={el}
                        channelName={ChannelName}
                        roleName={RoleName}
                        getTrackers={this.getTrackers}
                        channels={this.state.channels}
                        roles={this.state.roles}
                        toggleModal={this.toggleModal("edit", (idx + 1))}
                        />
                    </MDBModalBody>
                    </MDBModal>
                </tr>
            );
        });

        return(
            <Table striped bordered hover variant="dark" id="Trackers-Table">
            <thead>
                <tr>
                <th className="Trackers-TH">#</th>
                <th className="Trackers-TH">Username</th>
                <th className="Trackers-TH">Channel</th>
                <th className="Trackers-TH">Role</th>
                <th className="Trackers-TH" style={{ textAlign: "center" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {Trackers}
            </tbody>
            </Table>
        );
    }

    renderAddTracker() {
        return(
            <Col style={{ paddingLeft: 0 }}>
                <MDBBtn 
                color={Skin.hex} 
                className="Button" 
                size="md" 
                style={{ background: Skin.hex, padding: "8px", width: "150px" }}
                onClick={this.toggleModal("create", 1)}
                >
                    Add Tracker
                </MDBBtn>
                <MDBModal isOpen={this.findModal("create", 1)} toggle={this.toggleModal("create", 1)} size="lg">
                <MDBModalHeader toggle={this.toggleModal("create", 1)} tag="div" className="Modal">
                <h4 className="h4 display-inline">Add Twitch Tracker </h4>
                </MDBModalHeader>
                <MDBModalBody className="Modal">
                    <AddTracker 
                    userData={this.state.userData}
                    manageServer={this.state.manageServer}
                    getTrackers={this.getTrackers}
                    channels={this.state.channels}
                    roles={this.state.roles}
                    streamers={this.state.trackers.map(el => el.twitch_username)}
                    toggleModal={this.toggleModal("create", 1)}
                    />
                </MDBModalBody>
                </MDBModal>
            </Col>
        );
    }

    render() {
        return(
            <div id="Trackers">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="Component-Header">Trackers</h1>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "2%" }}>
                        <Col>
                            <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                            <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Trackers</p>
                        </Col>
                    </Row>
                    {!this.state.manageServer ? this.renderServerPicker() : ''}
                    <Row className="Component-Content">
                        {!this.state.dataReceived && this.state.manageServer ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : ''}
                        {this.state.dataReceived ? this.renderAddTracker() : ''}
                    </Row>
                    <Row className="Component-Content">
                        <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                        {this.state.dataReceived ? this.renderTrackers() : ''}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Trackers;