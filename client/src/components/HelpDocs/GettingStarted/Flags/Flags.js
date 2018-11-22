import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Flags.css';

class Flags extends Component {

  render() {
    return(
      <div id="Flags">
        <div className="Flags-Contents">
          <h3>Flags</h3>
          <p>Similar to the command line, flags allow you to add on to your initial command.</p>
          <br />

          <table className="Flags-Table">
            <tbody className="Flags-Tbody">
              <tr className="Flags-TR-Header">
                <th className="Flags-TH-Flags">Flag</th>
                <th className="Flags-TH-Description">Description</th>
              </tr>
              <tr className="Flags-TR">
                <td className="Flags-TD">-s</td>
                <td className="Flags-TD">Shuffles a playlist when adding it to the queue</td>
              </tr>
              <tr className="Flags-TR">
                <td className="Flags-TD">-i</td>
                <td className="Flags-TD">Gets more info on the command response</td>
              </tr>
            </tbody>
          </table>

          <br />
          <br />

          <table className="Flags-Table-AC">
            <tbody className="Flags-Tbody-AC">
              <tr className="Flags-TR-Header-AC">
                <th className="Flags-TH-Commands">Commands</th>
                <th className="Flags-TH-AvailableFlags">Available Flags</th>
              </tr>
              <tr className="Flags-TR">
                <td className="Flags-TD-Commands"><Link to="/help/commands/playlist">Playlist</Link></td>
                <td className="Flags-TD">-s</td>
              </tr>
              <tr className="Flags-TR">
                <td className="Flags-TD-Commands"><Link to="/help/commands/pokemon">Pokemon</Link></td>
                <td className="Flags-TD">-i</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Flags;
