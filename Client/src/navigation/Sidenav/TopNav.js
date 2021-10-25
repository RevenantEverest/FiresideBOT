import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@fluentui/react-theme-provider';
import { 
    MDBNavbar, 
    MDBNavbarNav, 
    MDBNavItem, 
    MDBNavLink, 
    MDBDropdown, 
    MDBDropdownToggle, 
    MDBDropdownMenu, 
    MDBDropdownItem, 
    MDBIcon
} from "mdbreact";
import { SIDENAV_BREAK_POINT } from '../../constants';

function TopNav({ windowWidth, handleToggleState }) {

    const theme = useTheme();
    const styles = useStyles();
    const avatar = false;

    const navStyle = {
        paddingLeft: windowWidth > SIDENAV_BREAK_POINT ? "210px" : "16px"
    };

    const renderAvatar = () => {
        if(avatar)
            return /* <Image className={styles.avatar} src={avatar} roundedCircle /> */
        else 
            return <MDBIcon className="mr-5" icon="user" />
    };

    return(
        <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
            <MDBNavbarNav left>
                <MDBNavItem>
                    <div className={styles.sideNavToggle} key="sideNavToggle" onClick={handleToggleState}>
                    <MDBIcon icon="bars" color={theme.colors.text} style={{  }} />
                    </div>
                </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
                <MDBNavItem>
                <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                    {renderAvatar()}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu right={windowWidth > 800 ? true : false} className="dropdown-default SideNav-TopNav__DropDownMenu">
                    <MDBDropdownItem className="SideNav-TopNav-Dropdown-Item-User" style={{ padding: "10px 15px 10px 15px" }}>
                            <span className="SideNav-TopNav-Dropdown-Item-Span">
                                {/* {this.state.discordUser ? `${this.state.discordUser.username}#${this.state.discordUser.discriminator}` : ''} */}
                            </span>
                    </MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBNavLink to="/account" style={{ padding: 0 }}>
                    <MDBDropdownItem className="SideNav-TopNav-Dropdown-Item" style={{ padding: "10px 15px 10px 15px" }}>
                            <MDBIcon icon="user-alt" />
                            <span className="SideNav-TopNav-Dropdown-Item-Span">Account</span>
                    </MDBDropdownItem>
                    </MDBNavLink>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem className="SideNav-TopNav-Dropdown-Item" onClick={() => this.handleLogout()}>
                        <MDBIcon icon="sign-out-alt" />
                        <span className="SideNav-TopNav-Dropdown-Item-Span">Logout</span>
                    </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
                </MDBNavItem>
            </MDBNavbarNav>
        </MDBNavbar>
    );
};

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: "32px", 
        border: "solid 3px #151515"
    },
    sideNavToggle: {
        lineHeight: "20px",
        marginRight: "1em",
        verticalAlign: "middle"
    }
}));

export default TopNav;