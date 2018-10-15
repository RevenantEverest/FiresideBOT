import React, { Component } from 'react';
import './ManageServer.css';

//Services Imports
import guildServices from '../../services/guildServices';

//Component Imports
import EditPrefix from './EditPrefix/EditPrefix';

class ManageServer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      guild_id: window.location.pathname.split("/")[4]
    }
  }

  componentDidMount() {
    this.getGuildInfo();
  }

  getGuildInfo() {
    guildServices.getGuildInfo(this.state.guild_id)
      .then(guild => {
        this.setState({ guildData: guild.data.data })
      })
      .catch(err => console.log(err));
  }

  renderGuildManage() {
    console.log("Help Me");
    return(
      <div className="">
        <h1>Managing: {this.state.guildData.guild_name}</h1>
        <EditPrefix guildData={this.state.guildData} />
      </div>
    );
  }

  render() {
    return(
      <div className="ManageServer">
        <div className="ManageServer-Contents">
          {this.state.guildData ? this.renderGuildManage() : <div className="loading" id="ManageServer" />}
        </div>
      </div>
    );
  }
};

export default ManageServer;
