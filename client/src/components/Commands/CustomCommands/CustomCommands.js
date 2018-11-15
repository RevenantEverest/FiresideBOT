import React, { Component } from 'react';
import './CustomCommands.css';

//Image Imports
import NTSH from '../../../res/images/NTSH.gif';

//Component Imports
// import AddCommand from './AddCommand/AddCommand';

//Services Import
import commandServices from '../../../services/commandServices';

class CustomCommands extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    }
    this.getCommands = this.getCommands.bind(this);
  }

  componentDidMount() {
    this.getCommands();
  }

  getCommands() {
    commandServices.getCustomCommands(this.state.userData.user_id)
      .then(commands => {
        this.setState({ commandData: commands.data.data, dataRecieved: true })
      })
      .catch(err => console.log(err));
  }

  renderCommands() {
    let counter = 0;
    let Commands = this.state.commandData.map((el, idx) => {
      counter++;
      return(
        <tr>
          <td>{counter}</td>
          <td>{el.command}</td>
          <td>{el.output}</td>
          <td>Insert Action Here</td>
        </tr>
      );
    });

    return(
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>COMMAND</th>
            <th>OUTPUT</th>
            <th>ACTION</th>
          </tr>
          {Commands}
        </tbody>
      </table>
    );
  }

  render() {
    return(
      <div className="CustomCommands">
        <div className="CustomCommands-Contents">
          <h1>UNDER CONSTRUCTION: Nothing to see here</h1>
          <img className="NTSH" src={NTSH} alt="" />
          {/*<AddCommand userData={this.state.userData} getCommands={this.getCommands} />*/}
          {/*this.state.dataRecieved ? this.renderCommands() : <div className="loading" id="CustomCommands" />*/}
        </div>
      </div>
    );
  }
};

export default CustomCommands;
