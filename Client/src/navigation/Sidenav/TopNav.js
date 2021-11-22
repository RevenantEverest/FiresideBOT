import React from 'react';
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
import { GuildPicker } from '../../components/Common';
import { SIDENAV_BREAK_POINT } from '../../constants';
import { discord } from '../../utils';

function TopNav({ api, userData, guilds, managedGuild, windowWidth, handleToggleState }) {

    const theme = useTheme();
    const styles = useStyles();

    const navStyle = {
        paddingLeft: windowWidth > SIDENAV_BREAK_POINT ? "210px" : "16px"
    };

    const renderAvatar = () => {
        if(userData.avatar)
            return <img className={styles.avatar} src={discord.avatarUrl(userData)} alt={userData.username} />;
        else 
            return <MDBIcon className="mr-2" icon="user" />
    };

    return(
        <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
            <MDBNavbarNav left>
                <MDBNavItem>
                    <div className={styles.sideNavToggle} key="sideNavToggle" onClick={handleToggleState}>
                    <MDBIcon icon="bars" color={theme.colors.text} style={{  }} />
                    </div>
                </MDBNavItem>
                {(windowWidth > 800) && <GuildPicker api={api} guilds={guilds} managedGuild={managedGuild} />}
            </MDBNavbarNav>
            <MDBNavbarNav right>
                {(windowWidth < 800) && <GuildPicker api={api} guilds={guilds} managedGuild={managedGuild} />}
                <MDBNavItem>
                <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                    {renderAvatar()}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu right={windowWidth > 800 ? true : false}>
                    <MDBDropdownItem style={{ padding: "10px 15px 10px 15px" }}>
                            <span>
                                {userData ? `${userData.username} #${userData.discriminator}` : ''}
                            </span>
                    </MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBNavLink to="/account" style={{ padding: 0 }}>
                    <MDBDropdownItem style={{ padding: "10px 15px 10px 15px" }}>
                            <MDBIcon icon="user-alt" className="mr-2" />
                            <span>Account</span>
                    </MDBDropdownItem>
                    </MDBNavLink>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem onClick={api.logout}>
                        <MDBIcon icon="sign-out-alt" className="mr-2" />
                        <span>Logout</span>
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
        border: "solid 3px #151515",
        borderRadius: 50
    },
    sideNavToggle: {
        lineHeight: "20px",
        marginRight: "1em",
        verticalAlign: "middle"
    }
}));

export default TopNav;