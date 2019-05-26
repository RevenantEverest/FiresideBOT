import React, { Component } from 'react';
import './EditPrefix.css';

//Services Imports
import guildServices from '../../../services/GuildServices/guildServices';

class EditPrefix extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guildData: this.props.guildData,
      dataReceived: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getGuildSettings();
  }

  getGuildSettings() {
    guildServices.getGuildSettings(this.state.guildData.guild_id)
      .then(settings => this.setState({ guildSettings: settings.data.data, dataReceived: true }))
      .catch(err => console.log(err));
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    guildServices.updateSettings({ guild_id: this.state.guildData.guild_id, prefix: this.state.prefix })
      .then(updatedSettings => {
        this.setState({ guildSettings: updatedSettings.data.data });
      })
      .catch(err => console.log(err));
  }

  renderPrefixForm() {
    return(
      <div>
        <form id="EditPrefixForm" onSubmit={this.handleSubmit}>
          <input className="EditPrefix-Prefix" type="text" name="prefix" placeholder={this.state.guildSettings.prefix} onChange={this.handleChange}/>
          <input className="EditPrefix-Submit" type="submit" value="Update" />
        </form>
        <p className="EditPrefix-Prefix-Desc">Default prefix is "?"</p>
      </div>
    );
  }

  render() {
    return(
      <div id="EditPrefix">
        <h4>Edit Prefix: </h4>
        {this.state.dataReceived ? this.renderPrefixForm() : <div className="loading" id="EditPrefix"/>}
      </div>
    );
  }
};

export default EditPrefix;
