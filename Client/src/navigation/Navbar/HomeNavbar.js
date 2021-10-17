import React, { useState, useEffect } from 'react';
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

function HomeNavbar({ changeTheme }) {

    const theme = useTheme();
    const styles = useStyles();

    const [collapse, setCollapse] = useState(false);

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        console.log(position);
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleCollapse = () => setCollapse(!collapse);

    return(
        <MDBNavbar className={scrollPosition > 50 || collapse ? styles.gradient : styles.transparent} fixed="top" dark expand="md" scrolling transparent={!collapse}>
            <Container>
            <MDBNavbarBrand href="/">
                <img className={styles.logo} src={Logo} alt="logo" />
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse isOpen={collapse} navbar>
                <MDBNavbarNav left>
                <MDBNavItem active>
                    <MDBNavLink to="/" className={styles.navLink}>Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/" className={styles.navLink}>
                        Getting Started
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/features" className={styles.navLink}>
                        Features
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/" className={styles.navLink}>
                        Commands
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/premium" className={styles.navLink}>
                        Premium
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/" className={styles.navLink}>
                        Support Server
                    </MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                <MDBNavItem>
                    <MDBNavLink to="/login">
                    <MDBBtn color={theme.colors.mdb.primary} rounded size="sm">
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
    transparent: {
        background: "transparent"
    },
    gradient: {
        background: `${theme.gradients.secondary} !important`,
    },
    navLink: {
        fontWeight: 600,
        fontSize: 14
    }
}));

export default HomeNavbar;