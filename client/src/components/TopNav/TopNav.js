import React, { Component } from 'react';
import './TopNav.css';

import env from '../../env';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Dropdown, Image } from 'react-bootstrap';

//Services Imports
import discordServices from '../../services/discordServices';
import guildServices from '../../services/GuildServices/guildServices';

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
            if(results.data.data) return this.getGuildInfo(el.id);
            else if(!results.data.data)
                this.setState({ chosenGuild: el }, () => {
                    window.location.replace(`https://discordapp.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&response_type=code&guild_id=${this.state.chosenGuild.id}&permissions=8&redirect_uri=${env.REDIRECT}dashboard%2F&scope=bot`);
                    console.log("[GUILD] ", this.state.chosenGuild)
                });
        })
        .catch(err => console.error(err));
    }

    getGuildInfo(id) {
        guildServices.getGuildInfo(id)
            .then(results => {
                let guild = { id: results.data.data.guild_id, name: results.data.data.guild_name };
                this.setState({ chosenGuild: guild }, () => {
                    console.log("[GUILD] ", this.state.chosenGuild)
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
                    <Navbar.Text style={{ color: "#cccccc", width: "250px" }}>
                    <FontAwesomeIcon className="FontAwesomeIcon" icon="user" />
                    <p style={{ color: "#cccccc", fontWeight: "600", display: "inline" }}>{this.props.userData.discord_username}</p>
                    </Navbar.Text>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default TopNav;