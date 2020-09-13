import React, { Component } from 'react';
import '../css/GuildSelect.css';

import { Image } from 'react-bootstrap';
import {
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBDropdownMenu
} from 'mdbreact';

class GuildSelect extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageGuild: this.props.manageGuild,
            chosenGuild: this.props.manageGuild || null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (el) => this.props.getManageGuild(el);

    renderGuilds() {
        let Guilds = this.props.guildData.map((el, idx) => {
            return(
                <MDBDropdownItem key={idx} onClick={() => this.handleChange(el)}>
                    <Image 
                    className="GuildSelect-GuildIcon" 
                    src={(el.icon ? `https://cdn.discordapp.com/icons/${el.id}/${el.icon}.png` : 'https://i.imgur.com/c26Syzn.jpg')} 
                    roundedCircle 
                    />
                    <span className="GuildSelect-Dropdown-Item-Span">{el.name}</span>
                </MDBDropdownItem>
            );
        });

        return(
            <MDBDropdown onChange={this.handleChange}>
            <MDBDropdownToggle caret color="elegant" size={this.props.nav ? "sm" : "lg"} className="GuildSelect-DropDown">
                {this.state.chosenGuild ? this.renderGuildImage() : '' }
                {this.state.chosenGuild ? this.renderGuildName() : 'Select Server' }
            </MDBDropdownToggle>
            <MDBDropdownMenu className="GuildSelect__DropDownMenu">
                {Guilds}
            </MDBDropdownMenu>
            </MDBDropdown>
        );
    }

    renderGuildImage() {
        let guild = this.state.chosenGuild;
        return(
            <Image 
            className="GuildSelect-ChosenGuild-GuildIcon"
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
            <MDBDropdownToggle color="elegant" size={this.props.nav ? "sm" : "lg"} className="d-none d-md-inline GuildSelect-DropDown">
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

export default GuildSelect;