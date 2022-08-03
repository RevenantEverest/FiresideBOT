import React, { Component } from 'react';
import './AutoDJ.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import PlaylistSelect from './PlaylistSelect/PlaylistSelect';
import AutoDJQueue from './AutoDJQueue/AutoDJQueue';
import AutoDJPlayer from './AutoDJPlayer/AutoDJPlayer';

class AutoDJ extends Component {

    constructor(props) {
        super(props);
        this.state = {
            controlIcon: "pause-circle"
        };
        this.getPlaylist = this.getPlaylist.bind(this);
        this.nextSong = this.nextSong.bind(this);
    }

    getPlaylist = (playlist) => this.setState({ chosenPlaylist: playlist, queue: playlist.songData, currentSong: playlist.songData[0] });

    nextSong() {
        let currentQueue = this.state.queue;
        currentQueue.shift();
        currentQueue.push(this.state.currentSong);
        this.setState({ queue: currentQueue, currentSong: currentQueue[0] });
    }

    renderAutoDJ() {
        return(
            <Container fluid>
            <Row>
                <Col>
                    <h1 className="Component-Header">AutoDJ</h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: "5%" }}>
                <Col>
                    <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                    <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ AutoDJ</p>
                </Col>
            </Row>
            <Row style={{ marginBottom: "5%" }}>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                <AutoDJPlayer currentSong={this.state.queue[0]} requestUser={this.props.userInfo.username} nextSong={this.nextSong} />
                </Col>
            </Row>
            <Row style={{ marginBottom: "5%" }}>
                <Col>
                {this.state.queue ? <AutoDJQueue queue={this.state.queue} /> : ''}
                </Col>
            </Row>
            </Container>
        );
    }

    render() {
        return(
            <div id="AutoDJ">
            {this.state.chosenPlaylist ? this.renderAutoDJ() : <PlaylistSelect userData={this.props.userData} getPlaylist={this.getPlaylist} />}
            </div>
        );
    }
};

export default AutoDJ;