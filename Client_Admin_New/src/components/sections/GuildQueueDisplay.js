import React, { Component } from 'react';

import { Row, Col, Image } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn
} from 'mdbreact';

import GuildQueueTable from './GuildQueueTable';

import utils from '../../utils';

class GuildQueueDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    toggle = (modal) => () => this.setState({ [modal]: !this.state[modal] });

    render() {
        const guild = this.props.guild;
        let queueLengthInSeconds = 0;
        let songAmount = guild.queue.queueInfo.length + 1;
        guild.queue.queueInfo.forEach(song => queueLengthInSeconds += parseInt(song.duration, 10));
        queueLengthInSeconds += parseInt(guild.queue.currentSongInfo.duration, 10);
        queueLengthInSeconds = utils.timeParser(queueLengthInSeconds);
        return(
            <div className="GuildQueueDisplay">
            <MDBCard>
            <MDBCardBody style={{ background: "#2a2a2a" }}>
                <Row>
                <Col lg={3}>
                    <Image 
                    style={{ width: "80px" }}
                    src={guild.icon ? guild.icon : "https://i.imgur.com/c26Syzn.jpg"} 
                    roundedCircle />
                </Col>
                <Col className="pl-0">
                    <div className="mt-3">
                    <h6 className="f-700">{guild.name}</h6>
                    <p className="d-inline"><MDBIcon icon="headphones-alt" /> {songAmount}</p>
                    <p className="d-inline ml-3"><MDBIcon icon="clock" /> {queueLengthInSeconds}</p>
                    <MDBBtn 
                    color="" 
                    className="grey darken-3 d-inline ml-2" 
                    size="sm"
                    onClick={this.toggle("displayModal")}>
                        View
                    </MDBBtn>
                    </div>
                </Col>
                </Row>
            </MDBCardBody>
            </MDBCard>

            <GuildQueueTable modal={this.state.displayModal} toggle={this.toggle("displayModal")} guild={this.props.guild} />
            </div>
        );
    }
};

export default GuildQueueDisplay;