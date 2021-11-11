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
import { _HomeRoutes } from '../_Routes';

function Navbar({ location, changeTheme, userData }) {

    const theme = useTheme();
    const styles = useStyles();

    const [collapse, setCollapse] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const isTransparent = (!collapse && location.pathname !== "/") || collapse ? true : false;
    const navbarClass = scrollPosition > 50 || isTransparent ? styles.gradient : styles.transparent;

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleCollapse = () => {
        return setCollapse(!collapse);
    };

    const isActive = (path) => {
        return location.pathname.split("/")[1] === path;
    };

    const renderRoutes = () => {
        return _HomeRoutes.filter(route => route.displayNav).map(route => (
            <MDBNavItem active={isActive(route.path)} key={route.path}>
                <MDBNavLink to={route.path} className={styles.navLink}>
                    {route.icon ? <route.icon className="mr-1" /> : ""}
                    {route.title}
                </MDBNavLink>
            </MDBNavItem>
        ));
    };

    return(
        <MDBNavbar className={navbarClass} fixed="top" dark expand="md" scrolling transparent={isTransparent}>
            <Container>
            <MDBNavbarBrand href="/">
                <img className={styles.logo} src={Logo} alt="logo" />
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse isOpen={collapse} navbar>
                <MDBNavbarNav left>
                    {renderRoutes()}
                </MDBNavbarNav>
                <MDBNavbarNav right>
                <MDBNavItem>
                    <MDBNavLink to={userData ? "/dashboard" : "/login"}>
                    <MDBBtn className={theme.classNames.button} rounded size="sm">
                        {userData ? "Go To Dashboard" : "Login"}
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

export default Navbar;