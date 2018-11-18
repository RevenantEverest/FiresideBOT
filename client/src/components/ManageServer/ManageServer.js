import React, { Component } from 'react';
import './ManageServer.css';

//Services Imports
import guildServices from '../../services/GuildServices/guildServices';

//Component Imports
import EditPrefix from './EditPrefix/EditPrefix';
import ManageGuildCurrency from '../CurrencySystem/ManageGuildCurrency/ManageGuildCurrency';

class ManageServer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      guild_id: window.location.pathname.split("/")[3]
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

  render() {
    return(
      <div className="ManageServer">
        <div className="ManageServer-Contents">
          <div className="ManageServer-Header">
            <h1 className="ManageServer-Header-Text">Manage Server</h1>
            <p className="ManageServer-Header-SubText">HOME / ManageServer /</p>
            <p className="ManageServer-Header-SubText-Main"> {this.state.guildData ? this.state.guildData.guild_name : ''}</p>
          </div>
          {this.state.guildData ? <EditPrefix guildData={this.state.guildData} /> : <div className="loading" id="ManageServer" />}
          {this.state.guildData ? <ManageGuildCurrency guildData={this.state.guildData} /> : <div className="loading" id="ManageServer" />}
        </div>
      </div>
    );
  }
};

export default ManageServer;
