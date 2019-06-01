import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Trackers.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';

//Component Imports
import AddTracker from '../AddTracker/AddTracker';

//Services Imports
import discordServices from '../../services/discordServices';
import twitchTrackerServices from '../../services/twitchTrackerServices';

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

    removeTracker(el) {
        twitchTrackerServices.removeTracker(el.id)
        .then(() => this.getTrackers())
        .catch(err => console.error(err))
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
                    <td className="Trackers-TD Trackers-TD-Action" style={{ textAlign: "center" }}>
                        <FontAwesomeIcon className="Trackers-Icon-Trash" icon="trash-alt" onClick={() => this.removeTracker(el)}/>
                    </td>
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
            <AddTracker 
            userData={this.state.userData}
            manageServer={this.state.manageServer}
            getTrackers={this.getTrackers}
            channels={this.state.channels}
            roles={this.state.roles}
            />
        );
    }

    render() {
        return(
            <div id="Trackers">
            <Container fluid id="Trackers-ContainerMain">
                <Container className="Trackers-Container">
                <Row>
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                        <h1 className="Component-Header">Trackers</h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                        <Link to="/"><p className="Component-Breadcrumb Trackers-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Trackers</p>
                    </Col>
                </Row>
                <Row className="Component-Content">
                    {this.state.dataReceived ? '' : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    {this.state.dataReceived ? this.renderAddTracker() : ''}
                </Row>
                <Row className="Component-Content">
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                    {this.state.dataReceived ? this.renderTrackers() : ''}
                    </Col>
                </Row>
                </Container>
            </Container>
            </div>
        );
    }
};

export default Trackers;