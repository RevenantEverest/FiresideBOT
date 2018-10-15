import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './YouTubePlayer.css';

//services Imports
import queueServices from '../../../services/queueServices';

//Component Imports
import YouTube from 'react-youtube';
import AutoDJRedirect from './AutoDJRedirect/AutoDJRedirect';


class YouTubePlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      opts: {
        playerVars: {
          autoplay: 1,
          disabledb: 1,
          rel: 0,
          enablejsapi: 1
        }
      },
      queue: this.props.queue,
      requestQueue: this.props.requestQueue,
      renderFrame: true,
      playPauseClass: 'YouTubePlayer-PlayPause-Play',
      currentTime: { minutes: 0, seconds: 0 },
      volumeIcon: 'volume-up'
    }
    this._onReady = this._onReady.bind(this);
    this.handleNextSong = this.handleNextSong.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
  }

  _onReady(e) {
    console.log(e.target);
    let playPauseButton = document.querySelector('.PlayPauseButton');
    let volumeSlider = document.querySelector('.YTP-VolumeSlider');
    playPauseButton.addEventListener('click', () => {
      if(this.state.playPauseClass === 'YouTubePlayer-PlayPause-Play')
        e.target.playVideo();
      else if(this.state.playPauseClass === 'YouTubePlayer-PlayPause-Pause')
        e.target.pauseVideo();
    });
    volumeSlider.value = e.target.getVolume();

    if(volumeSlider.value > 50)
      this.setState({ volumeIcon: 'volume-up' });
    else if(volumeSlider.value < 50 && volumeSlider.value != 0)
      this.setState({ volumeIcon: 'volume-down' });
    else if(volumeSlider.value === 0)
      this.setState({ volumeIcon: 'volume-off' });

    volumeSlider.oninput = () => {

      if(volumeSlider.value > 50)
        this.setState({ volumeIcon: 'volume-up' });
      else if(volumeSlider.value < 50 && volumeSlider.value != 0)
        this.setState({ volumeIcon: 'volume-down' });
      else if(volumeSlider.value === 0)
        this.setState({ volumeIcon: 'volume-off' });

      e.target.setVolume(volumeSlider.value);
    }

    function updateCurrentTime(state) {
      if(window.location.pathname != '/autodj') return;
      let currentTime = {};
      let display = document.querySelector('.YTP-CurrentTime-Text');
      let slider = document.querySelector('.YTP-CurrentTimeSlider');
      slider.value = Math.floor((e.target.getCurrentTime() * 100) / e.target.getDuration());
      currentTime.minutes = Math.floor(e.target.getCurrentTime() / 60);
      currentTime.seconds = Math.floor(e.target.getCurrentTime() - currentTime.minutes * 60);
      if(currentTime.seconds.toString().split("").length === 1) currentTime.seconds = "0" + currentTime.seconds;
      display.innerHTML = `${currentTime.minutes}:${currentTime.seconds}`;
      setTimeout(() => {
        updateCurrentTime();
      }, 1000)
    }
    updateCurrentTime();
  }

  _onStateChange() {
    if(this.state.playPauseClass === 'YouTubePlayer-PlayPause-Play')
      this.setState({ playPauseClass: 'YouTubePlayer-PlayPause-Pause' });
    else if(this.state.playPauseClass === 'YouTubePlayer-PlayPause-Pause')
      this.setState({ playPauseClass: 'YouTubePlayer-PlayPause-Play' });
  }

  handleNextSong(event) {
    if(this.props.requestQueue.length > 0) {
      let requestQueue = this.props.requestQueue;
      queueServices.deleteFromQueue(requestQueue[0].id)
        .catch(err => console.log(err));
      requestQueue.shift();
      this.props.updateRequestQueue(requestQueue);
      this.renderIframe();
    }else {
      let queue = this.props.queue;
      queue.push(queue[0]);
      queue.shift();
      this.props.updateQueue(queue);
      this.renderIframe();
    }
  }

  renderIframe() {
    let queuedSong  = {};
    if(this.props.requestQueue.length > 0) queuedSong.id = this.props.requestQueue[0].link.split("?v=")[1];
    else queuedSong.id = this.props.queue[0].link.split("?v=")[1];

    return(
      <div>
        <h1 className="CurrentSongHeader">Current Song</h1>
        <div className="videoWrapper">
          <YouTube
            id="ytp"
            videoId={queuedSong.id}
            opts={this.state.opts}
            onReady={this._onReady}
            onEnd={this.handleNextSong}
            onStateChange={this._onStateChange}
          />
        </div>
      </div>
    );
  }

  renderControls() {
    let queuedSong  = {};

    if(this.props.requestQueue.length > 0) {
      queuedSong.minutes = Math.floor(this.props.requestQueue[0].duration / 60);
      queuedSong.seconds = Math.floor(this.props.requestQueue[0].duration - queuedSong.minutes * 60);
      if(queuedSong.seconds.toString().split("").length === 1) queuedSong.seconds = "0" + queuedSong.seconds;
      queuedSong.link = this.props.requestQueue[0].link;
    }else {
      queuedSong.minutes = Math.floor(this.props.queue[0].duration / 60);
      queuedSong.seconds = Math.floor(this.props.queue[0].duration - queuedSong.minutes * 60);
      if(queuedSong.seconds.toString().split("").length === 1) queuedSong.seconds = "0" + queuedSong.seconds;
      queuedSong.link = this.props.queue[0].link;
    }

    return(
      <div className="YTP-Controls">
        <div className={`${this.state.playPauseClass} PlayPauseButton`} onClick={this.handlePlayerStateChange} />
        <div className="YouTubePlayer-NextButton" onClick={this.handleNextSong} />
        <div className="YTP-CurrentTime-Container">
          <div className="YTP-CurrentTime-Text-Container">
            <p className="YTP-CurrentTime-Text"></p>
          </div>
          <div className="YTP-CurrentTimeSlider-Container">
            <input className="YTP-CurrentTimeSlider" type="range" min="0" max="100" />
          </div>
          <div className="YTP-Duration-Text-Container">
            <p className="YTP-Duration-Text">{queuedSong.minutes}:{queuedSong.seconds}</p>
          </div>
        </div>
        <div className="YTP-VolumeSlider-Container">
          <div className="VolumeIcon-Container">
            <FontAwesomeIcon className="VolumeIcon" icon={this.state.volumeIcon} />
          </div>
          <input type="range" min="0" max="100" className="YTP-VolumeSlider" />
        </div>
      </div>
    );
  }

  renderVideoInfo() {
    let queuedSong  = {};

    if(this.props.requestQueue.length > 0) {
      queuedSong.minutes = Math.floor(this.props.requestQueue[0].duration / 60);
      queuedSong.seconds = Math.floor(this.props.requestQueue[0].duration - queuedSong.minutes * 60);
      if(queuedSong.seconds.toString().split("").length === 1) queuedSong.seconds = "0" + queuedSong.seconds;
      queuedSong.title = this.props.requestQueue[0].title;
      queuedSong.link = this.props.requestQueue[0].link;
    }else {
      queuedSong.minutes = Math.floor(this.props.queue[0].duration / 60);
      queuedSong.seconds = Math.floor(this.props.queue[0].duration - queuedSong.minutes * 60);
      if(queuedSong.seconds.toString().split("").length === 1) queuedSong.seconds = "0" + queuedSong.seconds;
      queuedSong.title = this.props.queue[0].title;
      queuedSong.link = this.props.queue[0].link;
    }

    return(
      <div className="YTP-VideoInfo">
        <h4>{queuedSong.title}</h4>
        <div className="YTP-Duration-Container">
          <FontAwesomeIcon className="ClockIcon" icon="clock" />
          <p className="YTP-CurrentSong-Duration">{queuedSong.minutes}:{queuedSong.seconds}</p>
        </div>
        <div className="YTP-Link-Container">
          <FontAwesomeIcon className="LinkIcon" icon="link" />
          <p className="YTP-CurrentSong-Link"><a href={queuedSong.link}>{queuedSong.link}</a></p>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div>
        {/* <FontAwesomeIcon className="YTP-Back" icon="arrow-circle-left" onClick={(e) => this.props.deleteQueue()}/>
        <h4 className="YTP-Back-Text">Choose Playlist</h4> */}
        <div className="YTP-Controls-Container">
          {this.state.renderFrame ? this.renderControls() : ''}
        </div>
        <AutoDJRedirect userData={this.state.userData} />
        <div className="videoWrapper-Container">
          {this.state.renderFrame ? this.renderIframe() : ''}
        </div>
        {this.state.renderFrame ? this.renderVideoInfo() : ''}
      </div>
    );
  }
};

export default YouTubePlayer;
