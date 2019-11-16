import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Aliases.css';

class Aliases extends Component {

    constructor() {
        super();
        this.state = {
            tableData: [
                {command: 'Balance', aliases: 'bal'},
                {command: 'BotInfo', aliases: 'stats, bi'},
                {command: 'CreatePlaylist', aliases: 'cp'},
                {command: 'DeletePlaylist', aliases: 'delplaylist, delplay, dp'},
                {command: 'Delsong', aliases: 'ds'},
                {command: 'Eightball', aliases: '8ball, fortune'},
                {command: 'MusicOptions', aliases: 'mo'},
                {command: 'NP', aliases: 'currentsong, nowplaying, cs'},
                {command: 'Playlist', aliases: 'playlists'},
                {command: 'PlayNext', aliases: 'pn'},
                {command: 'Queue', aliases: 'q'},
                {command: 'Resume', aliases: 'unpause'},
                {command: 'Roll', aliases: 'dice'},
                {command: 'ServerInfo', aliases: 'si'},
                {command: 'UserInfo', aliases: 'ui'},
                {command: 'Volume', aliases: 'vol'},
                {command: 'Weather', aliases: 'w'}
            ]
        }
    }

    renderTable() {
        let TableData = this.state.tableData.map((el, idx) => {
            return(
                <tr className="Aliases-TR" key={idx}>
                    <td className="Aliases-TD"><Link to={`/commands/${el.command.toLowerCase()}`}>{el.command}</Link></td>
                    <td className="Aliases-TD">{el.aliases}</td>
                </tr>
            );
        });

        return(
            <table className="Aliases-Table">
                <tbody className="Aliases-Tbody">
                    <tr className="Aliases-TR-Header">
                        <th className="Aliases-TH">Command</th>
                        <th className="Aliases-TH">Available Aliases</th>
                    </tr>
                    {TableData}
                </tbody>
            </table>
        );
    }

    render() {
        return(
            <div id="Aliases">
                <div className="Aliases-Contents">
                    <h4 className="Aliases-Header">Aliases</h4>
                    <br />
                    <br />
                    <p className="Aliases-Desc">Some commands have other ways of calling them. These are aliases. Below is a list of available aliases for certain commands.</p>
                    <br />
                    {this.renderTable()}
                </div>
            </div>
        );
    }
};

export default Aliases;