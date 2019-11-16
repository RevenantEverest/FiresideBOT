import React, { Component } from 'react';
import './Flags.css';

class Flags extends Component {
    
    constructor() {
        super();
        this.state = {
            commandTableData: [
                {command: 'MusicOptions', flags: '-r -l'},
                {command: 'Playlist', flags: '-s -i'},
                {command: 'Pokemon', flags: '-i'}
            ],

            flagTableData: [
                {flag: '-i', desc: 'Displays more info'},
                {flag: '-s', desc: 'Shuffles a Playlist before adding it to queue'},
                {flag: '-l', desc: 'Roggles Music Looping on or off'},
                {flag: '-r', desc: 'Toggles Music Recommendations on or off'}
            ]
        }
    }

    renderCommandTable() {
        let TableData = this.state.commandTableData.map((el, idx) => {
            return(
                <tr className="Flags-TR" key={idx}>
                    <td className="Flags-TD">{el.command}</td>
                    <td className="Flags-TD">{el.flags}</td>
                </tr>
            );
        });

        return(
            <table className="Flags-Table">
                <tbody className="Flags-Tbody">
                    <tr className="Flags-TR-Header">
                        <th className="Flags-TH">Command</th>
                        <th className="Flags-TH">Available Flags</th>
                    </tr>
                    {TableData}
                </tbody>
            </table>
        );
    }

    renderFlagTable() {
        let TableData = this.state.flagTableData.map((el, idx) => {
            return(
                <tr className="Flags-TR" key={idx}>
                    <td className="Flags-TD">{el.flag}</td>
                    <td className="Flags-TD">{el.desc}</td>
                </tr>
            );
        });

        return(
            <table className="Flags-Table">
                <tbody className="Flags-Tbody">
                    <tr className="Flags-TR-Header">
                        <th className="Flags-TH">Flag</th>
                        <th className="Flags-TH">Description</th>
                    </tr>
                    {TableData}
                </tbody>
            </table>
        );
    }

    render() {
        return(
            <div id="Flags">
                <h4 className="Flags-Header">Flags</h4>
                <br />
                <br />
                <p className="Flags-Desc">Similar to the command line, flags allow you to add on to your initial command.</p>
                <br />
                <div className="Flags-Contents">
                    {this.renderFlagTable()}
                    {this.renderCommandTable()}
                </div>
            </div>
        );
    }
};

export default Flags;