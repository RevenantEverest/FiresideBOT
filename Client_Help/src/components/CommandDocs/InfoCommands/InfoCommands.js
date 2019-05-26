import React, { Component } from 'react';
import './InfoCommands.css';

//Component Imports
import BotInfo from './BotInfo/BotInfo';
import ServerInfo from './ServerInfo/ServerInfo';
import UserInfo from './UserInfo/UserInfo';
import Weather from './Weather/Weather';

class InfoCommands extends Component {

    _BracketA = '<';
    _BracketB = '>';

    render() {
        return(
            <div id="InfoCommands">
                <div className="InfoCommands-Contents">
                    <h1 className="InfoCommands-Header">Info Commands</h1>
                    <br />
                    <p className="InfoCommands-SubHeader InfoCommands-SubHeader-ParamA">{this._BracketA}param{this._BracketB}</p>
                    <p className="InfoCommands-SubHeader">indicated a required parameter while </p>
                    <p className="InfoCommands-SubHeader InfoCommands-SubHeader-ParamB">[param]</p>
                    <p className="InfoCommands-SubHeader"> indicates an optional parameter</p>
                    <BotInfo />
                    <ServerInfo />
                    <UserInfo />
                    <Weather />
                </div>
            </div>
        );
    }
};

export default InfoCommands;