import React, { Component } from 'react';
import './AutoDJPlayer.css';

import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardHeader,
    MDBProgress,
    MDBRangeInput
} from 'mdbreact';

class AutoDJPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            controlIcon: "pause-circle",
            currentTime: 0,
            isPlaying: false,
            volume: 0,
        };
        this._onReady = this._onReady.bind(this);
        this._onEnd = this._onEnd.bind(this);
        this._onError = this._onError.bind(this);
        this._onPlay = this._onPlay.bind(this);
        this._onPause = this._onPause.bind(this);
    }

    _onReady(e) {
        console.log(e.target);
        this.setState({ playerEvents: e.target, volume: e.target.getVolume() });
    }

    _onEnd(e) {
        this.props.nextSong();
    }

    _onPlay(e) {
        this.setState({ 
            controlIcon: "pause-circle",
            isPlaying: true
        }, () => this.handleCurrentTime());
    }

    _onPause(e) {
        this.setState({ controlIcon: "play-circle", isPlaying: false })
    }

    _onError(err) {
        console.error(err);
    }

    timeParser(sec) {
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor(sec % 3600 / 60);
        let seconds = Math.floor(sec % 3600 % 60);

        let hDisplay = hours > 0 ? `${hours}:` : '';
        let mDisplay = minutes > 0 ? (minutes < 10 ? (hours > 0 ? `0${minutes}:` : `${minutes}:`) : `${minutes}:` ) : '00:';
        let sDisplay = seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}` ) : '00';
            
        return hDisplay + mDisplay + sDisplay;
    }

    updatePlayerState() {
        if(this.state.controlIcon === "play-circle")
            return this.state.playerEvents.playVideo();
        else if(this.state.controlIcon === 'pause-circle')
            return this.state.playerEvents.pauseVideo();
    }

    handleCurrentTime() {
        if(!this.state.isPlaying) return;
        let currentTime = this.state.playerEvents.getCurrentTime();
        let duration = this.state.playerEvents.getDuration();
        this.setState({ 
            currentTime: currentTime,
            durationPercentage: Math.floor((currentTime * 100) / duration)
        }, () => setTimeout(() => this.handleCurrentTime(), 1000));
    }

    handleValueChange = (value) => this.setState({ volume: value }, () => this.state.playerEvents.setVolume(value));

    renderControls() {
        return(
            <MDBCard>
            <MDBCardHeader style={{ background: "#262626", fontWeight: 600 }} tag="div">
                <Row>
                <Col md={2} style={{ paddingRight: 0 }}>
                    <FontAwesomeIcon className="AutoDJPlayer-Controls AutoDJPlayer-Play" icon={this.state.controlIcon} onClick={() => this.updatePlayerState()} />
                    <FontAwesomeIcon className="AutoDJPlayer-Controls AutoDJPlayer-Next" icon="forward" onClick={() => this.props.nextSong()} />
                </Col>
                <Col md={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Container fluid style={{ paddingLeft: 0, paddingRight: 0, position: "relative", top: "25%" }}>
                    <Row style={{ marginLeft: 0, marginRight: 0 }}>
                        <Col md={1} style={{ paddingRight: 0 }} className="text-center">
                            <h6 className="h6">{this.timeParser(this.state.currentTime)}</h6>
                        </Col>
                        <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <MDBProgress value={this.state.durationPercentage} color="warning" className="my-2" />
                        </Col>
                        <Col md={1} className="text-center">
                            <h6 className="h6">{this.timeParser(this.state.playerEvents.getDuration())}</h6>
                        </Col>
                    </Row>
                    </Container>
                </Col>
                <Col md={2}>
                    <Container fluid style={{ position: "relative", top: "25%" }}>
                    <Row>
                        <Col md={1}>
                            <FontAwesomeIcon icon={this.state.volume > 20 ? "volume-up" : (this.state.volume === 0 ? "volume-mute" : "volume-down" )} />
                        </Col>
                        <Col md={8}>
                            <MDBRangeInput 
                            name="volume" 
                            min={0} 
                            max={100} 
                            value={this.state.volume}
                            getValue={this.handleValueChange}
                            />
                        </Col>
                    </Row>
                    </Container>
                </Col>
                </Row>
            </MDBCardHeader>
            </MDBCard>
        );
    }

    render() {
        return(
            <div id="AutoDJPlayer">
                <Container fluid>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        {this.state.playerEvents ? this.renderControls() : ''}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <YouTube
                    videoId={this.props.currentSong.link.split("=")[1]}                              
                    className={"YouTube-Player"}                
                    containerClassName={""}       
                    opts={{ height: 390, width: 640, playerVars: { autoplay: 1 } }}               
                    onReady={this._onReady}               
                    onPlay={this._onPlay}                   
                    onPause={this._onPause}                    
                    onEnd={this._onEnd}
                    onError={this._onError}
                    />
                    </Col>
                    <Col>
                    <Row style={{ marginBottom: "2%" }}>
                        <Col>
                        <h4 className="h4">{this.props.currentSong.title}</h4>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "2%" }}>
                        <Col>
                        <FontAwesomeIcon className="display-inline" style={{ marginRight: "2%" }} icon="clock" />
                        <p className="display-inline">{this.timeParser(this.props.currentSong.duration)}</p>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "2%" }}>
                        <Col>
                        <FontAwesomeIcon className="display-inline" style={{ marginRight: "2%" }} icon="link" />
                        <a className="display-inline orange-text" href={this.props.currentSong.link}>{this.props.currentSong.link}</a>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "2%" }}>
                        <Col>
                        <FontAwesomeIcon className="display-inline" style={{ marginRight: "2%" }} icon="user" />
                        <p className="display-inline">{this.props.requestUser}</p>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default AutoDJPlayer;