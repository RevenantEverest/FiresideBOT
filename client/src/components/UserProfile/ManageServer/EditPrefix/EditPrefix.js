import React, { Component } from 'react';
import './EditPrefix.css';

//Services Imports
import guildServices from '../../../../services/guildServices';

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
    console.log("No Form");
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="prefix" placeholder={this.state.guildSettings.prefix} onChange={this.handleChange}/>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  render() {
    return(
      <div className="EditPrefix">
        {this.state.dataReceived ? this.renderPrefixForm() : <div className="loading" id="EditPrefix"/>}
      </div>
    );
  }
};

export default EditPrefix;
