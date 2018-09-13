import React, { Component } from 'react';
import './DefaultCommands.css';

//Services Imports
import commandServices from '../../../../services/commandServices';

class DefaultCommands extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
  }

  componentDidMount() {
    this.getCommands();
  }

  getCommands() {
    commandServices.getDefaultCommands()
      .then(commands => {
        this.setState({ commandData: commands.data.data, dataRecieved: true });
      })
      .catch(err => console.log(err))
  }

  renderCommands() {
    let counter = 0;
    let DefaultCommands = this.state.commandData.map((el, idx) => {
      counter++;
      return(
        <tr>
          <td>{counter}</td>
          <td>{el.command_name}</td>
          <td>{el.command_description}</td>
          <td>{el.commands_output}</td>
          <td><button>&times;</button></td>
        </tr>
      );
    });

    return(
      <table className="DefaultCommands-Table">
        <tbody>
          <tr>
            <th>#</th>
            <th>COMMANDS</th>
            <th>DESCRIPTION</th>
            <th>OUTPUT</th>
            <th>ACTION</th>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    return(
      <div className="DefaultCommands">
        <div className="DefaultCommands-Contents">
          {/* {this.state.dataRecieved ? this.renderCommands() : <div className="loading" id="DefaultCommands" />} */}
        </div>
      </div>
    );
  }
};

export default DefaultCommands;
