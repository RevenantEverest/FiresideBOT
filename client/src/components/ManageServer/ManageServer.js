import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './ManageServer.css';

//Services Imports
import guildServices from '../../services/GuildServices/guildServices';

//Component Imports
import EditPrefix from './EditPrefix/EditPrefix';
import CurrencySettings from '../CurrencySystem/ManageGuildCurrency/CurrencySettings/CurrencySettings';

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
            <Link to="/dashboard"><p className="ManageServer-Header-SubText">HOME / </p></Link>
            <Link to="/dashboard"><p className="ManageServer-Header-SubText"> ManageServer /</p></Link>
            <p className="ManageServer-Header-SubText-Main"> {this.state.guildData ? this.state.guildData.guild_name : ''}</p>
          </div>
          {this.state.guildData ? <EditPrefix guildData={this.state.guildData} /> : <div className="loading" id="LoadingManageServer" />}
          {this.state.guildData ? <CurrencySettings guildData={this.state.guildData} /> : <div className="loading" id="LoadingManageServer" />}
          {!this.state.userData ? <Redirect to="/" /> : ''}
        </div>
      </div>
    );
  }
};

export default ManageServer;
