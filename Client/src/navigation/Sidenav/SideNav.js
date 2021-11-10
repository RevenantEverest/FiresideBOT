import React, { useState, useEffect } from "react";
import '../../css/SideNav.css';
import { 
    MDBContainer as Container,
    MDBSideNavNav, 
    MDBSideNavLink,
    MDBSideNavCat, 
    MDBSideNav 
} from "mdbreact";
import { SIDENAV_BREAK_POINT } from '../../constants';
import { _DashboardRoutes } from '../_Routes';
import _Images from '../../assets/images/_Images';

import TopNav from "./TopNav";

function SideNav(props) {

    const [toggleState, setToggleState] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    const children = props.children.filter(child => child.type.name !== "Footer");
    const footerChild = props.children.filter(child => child.type.name === "Footer");

    const mainStyle = {
        margin: "0 6%",
        paddingTop: "5.5rem",
        paddingLeft: windowWidth > SIDENAV_BREAK_POINT ? "240px" : "0"
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleToggleState = () => {
        setToggleState(!toggleState);
    };

    const renderRoutes = () => {
        return _DashboardRoutes.map(route => {
            if(route.subRoutes)
                return renderDropdown(route);
            else 
                return renderLink(route);
        });
    };

    const renderLink = (route) => (
        <MDBSideNavLink className="font-weight-bold" to={route.path}>
            {route.icon && <route.icon className="mr-2" />}
            {route.title}
        </MDBSideNavLink>
    );

    const renderDropdown = (route) => (
        <MDBSideNavCat className="font-weight-bold" name={route.title} id={route.title + "-cat"} icon={route.icon}>
            {route.subRoutes.map(subRoute => (
                <MDBSideNavLink className="font-weight-bold" to={subRoute.path}>
                    {subRoute.title}
                </MDBSideNavLink>
            ))}
        </MDBSideNavCat>
    );

    return(
        <div id="SideNav" className="fixed-sn black-skin">
            <MDBSideNav
            logo={_Images.logo}
            triggerOpening={toggleState}
            breakWidth={SIDENAV_BREAK_POINT}
            bg={_Images.sideNavBackground}
            mask="strong"
            fixed
            >
                <MDBSideNavNav>
                {renderRoutes()}
                </MDBSideNavNav>
            </MDBSideNav>

            <TopNav windowWidth={windowWidth} handleToggleState={handleToggleState} />

            <main style={mainStyle}>
                <Container fluid className="mt-5">
                    {children}
                </Container>
            </main>
            {footerChild}
        </div>
    );
};

export default SideNav;