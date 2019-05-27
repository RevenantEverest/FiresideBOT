import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './TopNav.css';

import env from '../../env';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Dropdown, Image } from 'react-bootstrap';

//Services Imports
import discordServices from '../../services/discordServices';
import guildServices from '../../services/GuildServices/guildServices';
import loginServices from '../../services/loginServices';

class TopNav extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getGuilds();
    }

    componentWillUnmount = () => this._isMounted = false;

    getGuilds() {
        if(!this._isMounted) return setTimeout(() => this.getGuilds(), 2000);
        if(window.location.search) {
            guildServices.getGuildInfo(window.location.search.split("&")[1].split("guild_id=")[1])
                .then(guild => this.setState({ chosenGuild: guild.data.data }, () => {
                    this.props.getManageServer(this.state.chosenGuild);
                }))
                .catch(err => console.error(err));
        }
        discordServices.getUserGuilds(this.state.userData.discord_id)
            .then(guilds => {
                this.setState({ guildData: guilds.data.data.filter(el => el.permissions >= 2146958591), dataReceived: true })
            })
            .catch(err => console.error(err));
    }

    handleChange(el) {
        guildServices.checkForGuild(el.id)
        .then(results => {
            if(results.data.data.guild) return this.getGuildInfo(el.id);
            else if(!results.data.data.guild)
                this.setState({ chosenGuild: el }, () => {
                    window.location.replace(`https://discordapp.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&response_type=code&guild_id=${this.state.chosenGuild.id}&permissions=8&redirect_uri=${env.REDIRECT}dashboard%2F&scope=bot`);
                });
        })
        .catch(err => console.error(err));
    }

    handleLogout() {
        loginServices.logout(this.state.userData.discord_id)
        .then(() => {
            window.localStorage.clear();
            this.setState({ logoutRedirect: true });
        })
        .catch(err => console.error(err));
    }

    getGuildInfo(id) {
        guildServices.getGuildInfo(id)
            .then(results => {
                let guild = { id: results.data.data.guild_id, name: results.data.data.guild_name };
                this.setState({ chosenGuild: guild }, () => {
                    this.props.getManageServer({ id: results.data.data.guild_id, name: results.data.data.guild_name });
                })
            })
            .catch(err => console.error(err));
    }

    renderGuilds() {
        let Guilds = this.state.guildData.map((el, idx) => {
            return(
                <Dropdown.Item as="div" className="TopNav-Dropdown-Item" key={idx} onClick={() => this.handleChange(el)}>
                    <Image 
                    className="TopNav-GuildIcon" 
                    src={(el.icon ? `https://cdn.discordapp.com/icons/${el.id}/${el.icon}.png` : 'https://i.imgur.com/c26Syzn.jpg')} 
                    roundedCircle 
                    />
                    <span className="TopNav-Dropdown-Item-Span">{el.name}</span>
                </Dropdown.Item>
            );
        });

        return(
            <Dropdown onChange={this.handleChange} id="TopNav-Dropdown">
            <Dropdown.Toggle as="button" id="dropdown-basic" className="TopNav-Dropdown-Toggle">
                {this.state.chosenGuild ? this.state.chosenGuild.name : 'Select Server' }
            </Dropdown.Toggle>

            <Dropdown.Menu id="TopNav-Dropdown-Menu">
                {Guilds}
            </Dropdown.Menu>
            </Dropdown>
        );
    }

    render() {
        return(
            <div id="TopNav" style={{ color: "#cccccc", width: "99%" }}>
                <Navbar id="TopNav-Navbar">
                {this.state.dataReceived ? this.renderGuilds() : ''}
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Dropdown className="TopNav-UserDropdown">
                    <Dropdown.Toggle as="div" id="dropdown-basic" className="TopNav-UserDropdown-Toggle">
                        <Navbar.Text style={{ color: "#cccccc", width: "160px" }}>
                        <FontAwesomeIcon className="FontAwesomeIcon" icon="user" />
                        <p style={{ color: "#cccccc", fontWeight: "600", display: "inline" }}>{this.props.userData.discord_username}</p>
                        </Navbar.Text>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="TopNav-UserDropdown-Menu">
                        <Dropdown.Item as="div" className="TopNav-UserDropdown-Item" onClick={() => this.handleLogout()}>
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="sign-out-alt" />
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
                </Navbar>
                {this.state.logoutRedirect ? <Redirect to="/" /> : ''}
            </div>
        );
    }
}

export default TopNav;