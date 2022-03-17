import React, { Component } from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBModal,
    MDBModalBody,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBIcon
} from 'mdbreact';

import utils from '../../utils';

class GuildQueueTable extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderDetails() {
        let guild = this.props.guild;
        let musicOptions = this.props.guild.queue.options;
        let queueLengthInSeconds = 0;
        let songAmount = guild.queue.queueInfo.length + 1;
        guild.queue.queueInfo.forEach(song => queueLengthInSeconds += parseInt(song.duration, 10));
        queueLengthInSeconds += parseInt(guild.queue.currentSongInfo.duration, 10);
        queueLengthInSeconds = utils.timeParser(queueLengthInSeconds);

        return(
            <MDBCard style={{ height: "205px" }}>
            <MDBCardBody style={{ background: "#2a2a2a" }}>
                <Row>
                <Col lg={3}>
                    <Image 
                    style={{ width: "120px" }}
                    src={guild.icon ? guild.icon : "https://i.imgur.com/c26Syzn.jpg"} 
                    roundedCircle />
                </Col>
                <Col className="pl-0 mt-3">
                    <Row className="mb-2">
                        <Col>
                        <h6 className="f-700">{guild.name}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                        <h6>Queue Deatils</h6>
                        <p><MDBIcon icon="headphones-alt" /> {songAmount}</p>
                        <p><MDBIcon icon="clock" /> {queueLengthInSeconds}</p>
                        </Col>
                        <Col md={4}>
                        <h6>Queue Options</h6>
                        <p><MDBIcon icon="volume-up" /> {musicOptions.volume}</p>
                        <p><MDBIcon icon="redo-alt" /> {musicOptions.loop ? "On" : "Off"}</p>
                        </Col>
                    </Row>
                </Col>
                </Row>
            </MDBCardBody>
            </MDBCard>
        );
    }

    renderCurrentSong() {
        let currentSong = this.props.guild.queue.currentSongInfo;
        return(
            <MDBCard>
            <MDBCardBody style={{ background: "#2a2a2a" }}>
                <Row>
                <Col lg={3} className="mt-3">
                    <Image 
                    style={{ width: "120px" }}
                    src={currentSong.thumbnail ? currentSong.thumbnail : "https://i.imgur.com/c26Syzn.jpg"} />
                </Col>
                <Col className="pl-0">
                    <div className="mt-3">
                    <h6 className="f-700">{currentSong.title}</h6>
                    <p><MDBIcon icon="user" /> {currentSong.author}</p>
                    <p><MDBIcon icon="link" /> {currentSong.link}</p>
                    <p><MDBIcon icon="clock" /> {utils.timeParser(currentSong.duration)}</p>
                    </div>
                </Col>
                </Row>
            </MDBCardBody>
            </MDBCard>
        );
    }

    renderQueue() {
        let Queue = this.props.guild.queue.queueInfo.map((el, idx) => {
            return(
                <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{el.title}</td>
                    <td>{el.author}</td>
                    <td>{el.link}</td>
                    <td>{utils.timeParser(el.duration)}</td>
                    <td>{el.requestedBy}</td>
                </tr>
            );
        });

        return(
            <MDBTable>
            <MDBTableHead color="orange darken-4" textWhite>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Link</th>
                <th>Duration</th>
                <th>Requested By</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody style={{ background: "#2a2a2a" }}>
                {Queue}
            </MDBTableBody>
          </MDBTable>
        );
    }

    render() {
        return(
            <div className="GuildQueueTable">
            <Container>
            <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} frame position="top">
                <MDBModalBody className="Modal">
                <Container fluid>
                <Row className="justify-content-center mb-5 mt-4">
                    <Col md={5}>
                        {this.renderDetails()}
                    </Col>
                    <Col md={5}>
                        {this.renderCurrentSong()}
                    </Col>
                </Row>
                <Row className="justify-content-center mb-5 mt-4">
                    <Col md={10}>
                        <div style={{ height: "500px", overflowY: "scroll" }}>
                        {this.renderQueue()}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={11} className="d-flex flex-row-reverse">
                    <MDBBtn color="elegant" size="md" onClick={this.props.toggle}>Close</MDBBtn>
                    </Col>
                </Row>
                </Container>
                </MDBModalBody>
            </MDBModal>
            </Container>
            </div>
        );
    }
};

export default GuildQueueTable;