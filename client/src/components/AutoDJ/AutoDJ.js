import React, { Component } from 'react';
import './AutoDJ.css';

//Services Imports

import userSongsServices from '../../services/UserServices/userSongsServices';
import queueServices from '../../services/queueServices';

//Component Imports
import YouTubePlayer from './YouTubePlayer/YouTubePlayer';

class AutoDJ extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.location.state.userData,
      queue: null
    }
    this.updateQueue = this.updateQueue.bind(this);
    this.updateRequestQueue = this.updateRequestQueue.bind(this);
    this.deleteQueue = this.deleteQueue.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location);
    this.getSongs(this.props.location.state.playlistId);
  }

  getSongs(playlist) {
    userSongsServices.getPlaylistSongInfo(playlist)
      .then(songs => {
        queueServices.getChannelQueue(this.state.userData.twitch_username.split("#")[1])
          .then(queue => {
            if(queue.data.data.count)
              this.setState({ queue: songs.data.data, requestQueue: [] }, () => this.pollQueue())
            else this.setState({ queue: songs.data.data, requestQueue: queue.data.data }, () => this.pollQueue());
          })
      })
      .catch(err => console.log(err));
  }

  pollQueue() {
    if(this.state.userData.twitch_username === 'not connected') return;
    if(window.location.pathname !== '/autodj') return;
    queueServices.getChannelQueue(this.state.userData.twitch_username.split("#")[1])
      .then(queue => {
        if(queue.data.data.count)
          this.setState({ requestQueue: [] });
        else {
          this.setState({ requestQueue: queue.data.data });
        }
        setTimeout(() => {
          this.pollQueue()
        }, 2000);
      })
  }

  deleteRequest(el) {
    queueServices.deleteFromQueue(el.id)
      .catch(err => console.log(err));
  }

  renderSongs() {
    let counter = -1;
    let queueClass = '';

    let RequestQueue = this.state.requestQueue.map((el, idx) => {
      counter++;
      if(counter % 2 === 0) queueClass = 'AutoDJ-Queue-Grey';
      else if(counter % 2 === 1) queueClass = '';
      return(
        <tr className={`AutoDJ-Queue-Requests AutoDJ-Queue-Tr ${queueClass}`} key={idx}>
          <td className="AutoDJ-Queue-Td">{el.title}</td>
          <td className="AutoDJ-Queue-Td">{el.link}</td>
          <td className="AutoDJ-Queue-Td AutoDJ-TableRow-Action">
            <button className="AutoDJ-RequestDelete" onClick={(e) => this.deleteRequest(el)}>&times;</button>
          </td>
        </tr>
      );
    });

    let Songs = this.state.queue.map((el, idx) => {
      counter++;
      if(counter % 2 === 0) queueClass = 'AutoDJ-Queue-Grey';
      else if(counter % 2 === 1) queueClass = '';
      return(
        <tr className={`AutoDJ-Queue-Songs AutoDJ-Queue-Tr ${queueClass}`} key={idx}>
          <td className="AutoDJ-Queue-Td">{el.title}</td>
          <td className="AutoDJ-Queue-Td">{el.link}</td>
          <td className="AutoDJ-Queue-Td"></td>
        </tr>
      );
    });

    if(this.state.requestQueue.length < 1) Songs.splice(0, 1);
    else RequestQueue.splice(0, 1);

    return(
      <div>
        <YouTubePlayer
          userData={this.state.userData}
          queue={this.state.queue}
          requestQueue={this.state.requestQueue}
          updateQueue={this.updateQueue}
          updateRequestQueue={this.updateRequestQueue}
          deleteQueue={this.deleteQueue}
        />
        <h4 className="QueueHeader">Queue</h4>
        <table className="AutoDJ-Queue-Table">
          <tbody className="AutoDJ-Queue-Tbody">
            <tr className="AutoDJ-Queue-Headers AutoDJ-Queue-Tr">
              <th className="AutoDJ-Queue-Th">Title</th>
              <th className="AutoDJ-Queue-Th">Link</th>
              <th className="AutoDJ-Queue-Th">Action</th>
            </tr>
            {RequestQueue}
            {Songs}
          </tbody>
        </table>
      </div>
    );
  }

  updateRequestQueue(requestQueue) { this.setState({ requestQueue: requestQueue }); }
  updateQueue(queue) { this.setState({ queue: queue }); }
  deleteQueue() { this.setState({ queue: null }); }

  render() {
    return(
      <div className="AutoDJ">
        <div className="AutoDJ-Contents">
          {this.state.queue ? this.renderSongs() : ''}
          <div className="TableHeightFix" />
        </div>
      </div>
    );
  }
};

export default AutoDJ;
