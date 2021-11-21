import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';
import { discord, text } from '../../utils';

function GuildPicker({ api, managedGuild, guilds, size }) {
    
    const styles = useStyles();

    const handleChange = (value) => {
        api.updateManagedGuild(value);
    };

    const renderGuilds = () => {
        return guilds.items.map(guild => (
            <MDBDropdownItem key={guild.name} onClick={() => handleChange(guild)}>
                {renderGuildImage(guild)}
                <span>{text.truncateText(guild.name, 25)}</span>
            </MDBDropdownItem>
        ));
    };

    const renderNoGuilds = () => {
        return(
            <MDBDropdownItem>
                <span>No Guilds</span>
            </MDBDropdownItem>
        );
    };

    const renderGuildImage = (guild, isManagedGuild) => {
        const guildIconURL = guild.icon ? discord.guildIconUrl(guild) : 'https://i.imgur.com/c26Syzn.jpg';
        const className = (isManagedGuild ? styles.managedGuildIcon : styles.guildIcon);
        return(
            <img className={"mr-2 " + className} src={guildIconURL} alt={guild.name} />
        );
    };

    return(
        <MDBDropdown onChange={handleChange} className={"ml-4 " + styles.dropdown}>
        <MDBDropdownToggle className={"w-100 " + styles.dropdownToggle} caret color="elegant" size={size}>
            {managedGuild ? renderGuildImage(managedGuild, true) : '' }
            {managedGuild ? text.truncateText(managedGuild.name) : 'Select Server' }
        </MDBDropdownToggle>
        <MDBDropdownMenu className={" " + styles.dropdownMenu}>
            {Array.isArray(guilds.items) && renderGuilds()}
        </MDBDropdownMenu>
        </MDBDropdown>
    );
};

const useStyles = makeStyles((theme) => ({
    dropdown: {
        minWidth: "200px !important"
    },
    dropdownToggle: {
        fontWeight: "600 !important"
    },
    dropdownMenu: {
        backgroundColor: `${theme.colors.card} !important`,
        'span': {
            color: `${theme.colors.text} !important`,
            fontWeight: "600"
        },
        'button:hover': {
            backgroundColor: `${theme.colors.cardLight} !important`
        }
    },
    managedGuildIcon: {
        width: 20,
        borderRadius: 50
    },
    guildIcon: {
        width: 30,
        borderRadius: 50
    }
}));

GuildPicker.defaultProps = {
    size: "sm",
    managedGuild: null,
};

GuildPicker.propTypes = {
    size: PropTypes.string,
    managedGuild: PropTypes.object,
    guilds: PropTypes.array
};

export default GuildPicker;