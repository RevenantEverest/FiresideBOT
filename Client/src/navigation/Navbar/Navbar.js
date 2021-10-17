import React, { useState } from 'react';
import { makeStyles, useTheme } from '@fluentui/react-theme-provider';
import {
    MDBContainer as Container,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBCollapse,
    MDBBtn
} from 'mdbreact';

import ThemeChanger from '../../components/ThemeChanger/ThemeChanger';

import Logo from '../../assets/images/logo_trans.png';

function Navbar({ location, changeTheme }) {

    const theme = useTheme();
    const styles = useStyles();

    const [collapse, setCollapse] = useState(false);

    const toggleCollapse = () => setCollapse(!collapse);

    const isActive = (path) => {
        return location.pathname.split("/")[1] === path;
    }

    return(
        <MDBNavbar className={styles.gradient} fixed="top" dark expand="md" scrolling>
            <Container>
            <MDBNavbarBrand href="/">
                <img className={styles.logo} src={Logo} alt="logo" />
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav left>
                <MDBNavItem active={isActive("/")}>
                    <MDBNavLink to="/" className={styles.navLink}>
                        Getting Started
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={isActive("/")}>
                    <MDBNavLink to="/features" className={styles.navLink}>
                        Features
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={isActive("/")}>
                    <MDBNavLink to="/" className={styles.navLink}>
                        Commands
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={isActive("/")}>
                    <MDBNavLink to="/premium" className={styles.navLink}>
                        Premium
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={isActive("/")}>
                    <MDBNavLink to="/" className={styles.navLink}>
                        Support Server
                    </MDBNavLink>
                </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
                <MDBNavItem>
                    <MDBNavLink to="/login">
                    <MDBBtn color={theme.colors.mdb.primary} rounded size="md">
                        Login
                    </MDBBtn>
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <div className="d-flex justify-content-center align-items-center h-100 pl-5">
                        <ThemeChanger changeTheme={changeTheme} />
                    </div>
                </MDBNavItem>
            </MDBNavbarNav>
            </MDBCollapse>
            </Container>
        </MDBNavbar>
    );
};

const useStyles = makeStyles((theme) => ({
    logo: {
        marginTop: -20,
        width: 42
    },
    gradient: {
        background: `${theme.gradients.primary} !important`,
    },
    navLink: {
        fontWeight: 600,
        fontSize: 14
    }
}));

export default Navbar;