import React, { useState, useEffect } from "react";
import '../../css/SideNav.css';
import { makeStyles, useTheme } from "@fluentui/react-theme-provider";
import { 
    MDBContainer as Container,
    MDBSideNavNav, 
    MDBSideNavLink,
    MDBSideNavCat, 
    MDBSideNav
} from "mdbreact";
import { SIDENAV_BREAK_POINT } from '../../constants';
import { _DashboardRoutes } from '../_Routes';
import { colors } from "../../utils";
import _Images from '../../assets/images/_Images';

import TopNav from './TopNav';

function SideNav(props) {

    const { api, userData } = props;

    const theme = useTheme();
    const styles = useStyles();

    const [toggleState, setToggleState] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    const currentPath = `/${props.location.pathname.split("/")[1]}`;

    const children = props?.children.filter(child => child?.type?.name !== "Footer") ?? [];
    const footerChild = props?.children.filter(child => child?.type?.name === "Footer") ?? [];

    const mainStyle = {
        margin: "0 6%",
        paddingTop: "5.5rem",
        paddingLeft: windowWidth > SIDENAV_BREAK_POINT ? "240px" : "0"
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        api.getGuilds(userData.discord_id);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [api, userData.discord_id]);

    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleToggleState = () => setToggleState(!toggleState);
    const isActive = (path) => path === currentPath ? styles.active : styles.nonActiveRoute;

    const renderRoutes = () => {
        return _DashboardRoutes.filter(route => route.displayNav).map(route => {
            if(route.subRoutes) return renderDropdown(route);
            else return renderLink(route);
        });
    };

    const renderLink = (route) => (
        <MDBSideNavLink className={["font-weight-bold", isActive(route.path)].join(" ")} to={route.path} key={`sideNav-link-${route.path}`}>
            {route.icon && <route.icon className="mr-2" />}
            {route.title}
        </MDBSideNavLink>
    );

    const renderDropdown = (route) => (
        <MDBSideNavCat className={"font-weight-bold " + styles.dropdown} name={route.title} id={route.title + "-cat"} icon={route.icon} key={`sideNav-cat-${route.path}`}>
            {route.subRoutes.map(subRoute => (
                <MDBSideNavLink className={["font-weight-bold", styles.dropdownElement, isActive(subRoute.path)].join(" ")} to={subRoute.path} key={subRoute.title}>
                    {subRoute.title}
                </MDBSideNavLink>
            ))}
        </MDBSideNavCat>
    );

    return(
        <div id="SideNav" className="fixed-sn black-skin">
            <MDBSideNav
            href="/"
            className={styles.sideNav}
            logo={_Images.logo}
            triggerOpening={toggleState}
            breakWidth={SIDENAV_BREAK_POINT}
            bg={_Images.sideNavBackground}
            mask={theme.maskStrength}
            fixed
            >
                <MDBSideNavNav>
                    {renderRoutes()}
                </MDBSideNavNav>
            </MDBSideNav>

            <TopNav 
            api={api}
            userData={userData} 
            guilds={props.guilds}
            managedGuild={props.managedGuild} 
            windowWidth={windowWidth} 
            handleToggleState={handleToggleState}
            />

            <main style={mainStyle}>
                <Container fluid className="mt-5">
                    {children}
                </Container>
            </main>
            {footerChild}
        </div>
    );
};

const useStyles = makeStyles((theme) => {

    const darkMode = theme.maskStrength === "strong";
    const hoverBackground = colors.hexToRgba(theme.colors.primary, (darkMode ? .3 : .4));

    return({
        sideNav: {
            '.sidenav-bg::after': {
                backgroundColor: `rgba(0, 0, 0, ${darkMode ? ".8" : ".5"}) !important`
            }
        },
        dropdown: {
            backgroundColor: `rgba(0,0,0,0) !important`,
            ':hover': {
                background: `${hoverBackground} !important`
            }
        },
        dropdownElement: {
            ':hover': {
                '>span': {
                    color: `${theme.colors.secondary} !important`
                }
            }
        },
        nonActiveRoute: {
            backgroundColor: `rgba(0,0,0,0) !important`,
            ':hover': {
                background: `${hoverBackground} !important`
            }
        },
        active: {
            backgroundColor: `${hoverBackground} !important`,
            '>span': {
                color: `${theme.colors.secondary} !important`
            }
        }
    });
});

export default SideNav;