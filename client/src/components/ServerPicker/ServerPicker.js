import React, { Component } from 'react';
import './ServerPicker.css';

import { Image } from 'react-bootstrap';
import {
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBDropdownMenu
} from 'mdbreact';

import env from '../../env';
import guildServices from '../../services/GuildServices/guildServices';

class ServerPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(el) {
        guildServices.checkForGuild(el.id)
        .then(results => {
            if(results.data.data.guild) return this.getGuildInfo(el);
            else if(!results.data.data.guild)
                this.setState({ chosenGuild: el }, () => {
                    window.location.replace(`https://discordapp.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&response_type=code&guild_id=${this.state.chosenGuild.id}&permissions=8&redirect_uri=${env.REDIRECT}dashboard%2F&scope=bot`);
                });
        })
        .catch(err => console.error(err));
    }

    getGuildInfo(el) {
        guildServices.getGuildInfo(el.id)
        .then(() => {
            this.setState({ chosenGuild: el }, () => {
                this.props.getManageServer({ id: el.id, name: el.name });
            })
        })
        .catch(err => console.error(err));
    }

    renderGuilds() {
        let Guilds = this.props.guildData.map((el, idx) => {
            return(
                <MDBDropdownItem key={idx} onClick={() => this.handleChange(el)}>
                    <Image 
                    className="ServerPicker-GuildIcon" 
                    src={(el.icon ? `https://cdn.discordapp.com/icons/${el.id}/${el.icon}.png` : 'https://i.imgur.com/c26Syzn.jpg')} 
                    roundedCircle 
                    />
                    <span className="ServerPicker-Dropdown-Item-Span">{el.name}</span>
                </MDBDropdownItem>
            );
        });

        return(
            <MDBDropdown onChange={this.handleChange}>
            <MDBDropdownToggle caret color="elegant" size={this.props.nav ? "sm" : "lg"} className="ServerPicker-DropDown">
                {this.state.chosenGuild ? this.renderGuildImage() : '' }
                {this.state.chosenGuild ? this.renderGuildName() : 'Select Server' }
            </MDBDropdownToggle>
            <MDBDropdownMenu className="ServerPicker__DropDownMenu">
                {Guilds}
            </MDBDropdownMenu>
            </MDBDropdown>
        );
    }

    renderGuildImage() {
        let guild = this.state.chosenGuild;
        return(
            <Image 
            className="ServerPicker-ChosenGuild-GuildIcon"
            src={(guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : 'https://i.imgur.com/c26Syzn.jpg')} 
            roundedCircle 
            />
        );
    }

    renderGuildName() {
        let guild = this.state.chosenGuild;
        let guildName = guild.name;
        if(guild.name.split("").length > 15) {
            guildName = "";
            for(let i = 0; i < guild.name.split("").length; i++) {
                if(i < 15) guildName += guild.name.split("")[i];
            }
            guildName += "..."
        }
        return guildName;
    }

    renderSpinner() {
        return(
            <MDBDropdown>
            <MDBDropdownToggle color="elegant" size={this.props.nav ? "sm" : "lg"} className="d-none d-md-inline ServerPicker-DropDown">
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </MDBDropdownToggle>
            </MDBDropdown>
        );
    }

    render() {
        return this.props.guildData ? this.renderGuilds() : this.renderSpinner();
    }
};

export default ServerPicker;