import React, { Component } from 'react';
import './AddCommand.css';

//Services Imports
import commandServices from '../../../../../services/commandServices';

class AddCommand extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    let submitData = {
      user_id: this.state.userData.user_id,
      command: this.state.command,
      output: this.state.output
    }
    commandServices.addCommand(submitData)
      .then(command => { this.props.getCommands(); document.querySelector("#AddCommandForm").reset(); })
      .catch(err =>  console.log(err));
  }

  render() {
    return(
      <div className="AddCommand">
        <form id="AddCommandForm" onSubmit={this.handleSubmit}>
          <input type="text" name="command" placeholder="Command" onChange={this.handleChange} />
          <input type="text" name="output" placeholder="Output" onChange={this.handleChange} />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
};

export default AddCommand;
