import React, { Component } from 'react';
import './AddRegular';

//Services Imports
import regularsServices from '../../../services/regularsServices';

class AddRegular extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      channel: this.state.userData.twitch_username.split("#")[1],
      regular_username: this.state.regular_username
    }
    regularsServices.addRegular(data)
      .then(results => {
        document.querySelector('#AddRegularForm').reset();
        this.props.renderRegulars();
      })
      .catch(err => console.log(err))
  }

  render() {
    return(
      <div id="AddRegular">
        <div className="AddRegular-Contents">
          <form id="AddRegularForm" onSubmit={this.handleSubmit} autoComplete="off">
            <input type="text" name="regular_username" placeholder="Regular's Username" onChange={this.handleChange}/>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
};

export default AddRegular;
