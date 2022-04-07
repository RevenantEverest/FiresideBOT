import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody
} from 'mdbreact';

import utils from '../../utils';

class ServerQueueDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderQueueDetails() {
        const servers = this.props.servers.filter(el => el.queue.isPlaying);
        let queuesInProgress = servers.length || 0;
        let queueLengthInSeconds = 0;
        let queueSongAmount = 0;

        if(queuesInProgress > 0) {
            for(let i = 0; i < servers.length; i++) {
                for(let j = 0; j < servers[i].queue.queueInfo.length; j++) {
                    queueLengthInSeconds += parseInt(servers[i].queue.queueInfo[j].duration, 10);
                }
                queueLengthInSeconds += parseInt(servers[i].queue.currentSongInfo.duration, 10);
                queueSongAmount += parseInt(servers[i].queue.queueInfo.length, 10);
            }

            queueLengthInSeconds = utils.timeParser(queueLengthInSeconds, true);
        }

        return(
            <Row className="mt-4">
                <Col lg={4} sm={12} className="mb-4">
                <MDBCard>
                <MDBCardHeader>Queues In Progress</MDBCardHeader>
                <MDBCardBody>
                {queuesInProgress}
                </MDBCardBody>
                </MDBCard>
                </Col>
                <Col lg={4} sm={12} className="mb-4">
                <MDBCard>
                <MDBCardHeader>Overall Length</MDBCardHeader>
                <MDBCardBody>
                {queueLengthInSeconds}
                </MDBCardBody>
                </MDBCard>
                </Col>
                <Col lg={4} sm={12} className="mb-4">
                <MDBCard>
                <MDBCardHeader>Songs In Queue</MDBCardHeader>
                <MDBCardBody>
                {queueSongAmount}
                </MDBCardBody>
                </MDBCard>
                </Col>
            </Row>
        );
    }

    render() {
        return(
            <div className="ServerQueueDetails">
                <Container fluid className="pl-0 pr-0">
                {this.renderQueueDetails()}
                </Container>
            </div>
        );
    }
};

export default ServerQueueDetails;