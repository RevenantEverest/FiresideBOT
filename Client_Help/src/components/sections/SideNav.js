import React, { Component } from "react";
import '../css/SideNav.css';

import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Image } from 'react-bootstrap';
import { 
    MDBNavbar, 
    MDBNavbarNav, 
    MDBNavItem,
    MDBDropdown, 
    MDBDropdownToggle, 
    MDBDropdownMenu, 
    MDBDropdownItem, 
    MDBIcon,
    MDBSideNavNav, 
    MDBSideNav,
    MDBSideNavLink,
    MDBFormInline
} from "mdbreact";

import WhatsNew from '../pages/WhatsNew';
import Gettingstarted from '../pages/GettingStarted';
import Category from '../pages/Category';
import Commands from '../pages/Commands';
import SingleCommand from '../pages/SingleCommand';
import Footer from './Footer';

class SideNav extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            toggleStateA: false,
            breakWidth: 1300,
            windowWidth: 0,
            search: ''
        };
    }

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize = () => this.setState({ windowWidth: window.innerWidth });
    handleToggleClickA = () => this.setState({ toggleStateA: !this.state.toggleStateA });

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    renderCategories() {
        let _categories = this.props.commands.map(el => el.category);
        _categories = _categories.filter((el, idx) => _categories.indexOf(el) === idx);
        let Categories = _categories.map((el, idx) => {
            return(
                <div key={idx}>
                <Link to={`/categories/${el.toLowerCase()}`}><h5 className="h5" style={{ fontWeight: 800 }}>{el}</h5></Link>
                {
                    this.props.commands.filter(commands => commands.category === el).map((command, idx) => {
                        return(
                            <MDBSideNavLink to={`/commands/${command.name}`} topLevel className="SideNav-El" key={idx}>
                                {command.d_name}
                            </MDBSideNavLink>
                        );
                    })
                }
                <br />
                </div>
            );
        });

        return Categories;
    }

    routeCommands() {
        let Commands = this.props.commands.map((el, idx) => {
            return <Route key={idx} exact path={`/commands/${el.name}`} component={() => (<SingleCommand command={el} />)} />
        });

        return Commands;
    }

    routeCategories() {
        let _categories = this.props.commands.map(el => el.category);
        _categories = _categories.filter((el, idx) => _categories.indexOf(el) === idx);
        let Categories = _categories.map((el, idx) => {
            return <Route 
            key={idx} 
            exact path={`/categories/${el.toLowerCase()}`} 
            component={() => (<Category page search={this.state.search} category={el} commands={this.props.commands.filter(command => command.category === el)} />)}
            />
        });

        return Categories;
    }

    render() {
        return (
            <div className="fixed-sn black-skin">
                <MDBSideNav
                className="SideNav"
                logo="https://i.imgur.com/NnflIQW.png"
                triggerOpening={this.state.toggleStateA}
                breakWidth={this.state.breakWidth}
                bg="https://i.imgur.com/OrxckTo.png"
                href="/"
                mask="light"
                fixed
                >
                <MDBSideNavNav>
                    <MDBSideNavLink to="/whatsnew" topLevel className="SideNav-El">
                        What's New
                    </MDBSideNavLink>
                    <MDBSideNavLink to="/gettingstarted" topLevel className="SideNav-El">
                        Getting Started
                    </MDBSideNavLink>
                    <br />
                    <Link to="/commands"><h5 className="h5" style={{ fontWeight: 800 }}>All Commands</h5></Link>
                    <br />
                    {this.props.commands ? this.renderCategories() : <MDBSideNavLink />}
                </MDBSideNavNav>
                </MDBSideNav>
                <MDBNavbar style={{ paddingLeft: this.state.windowWidth > this.state.breakWidth ? "210px" : "16px" }} double expand="md" fixed="top" scrolling>
                <MDBNavbarNav left>
                    <MDBNavItem>
                        <div
                        onClick={this.handleToggleClickA}
                        key="sideNavToggleA"
                        style={{
                            lineHeight: "20px",
                            marginRight: "1em",
                            verticalAlign: "middle"
                        }}
                        >
                        <MDBIcon icon="bars" color="white" style={{  }} />
                        </div>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right style={{ marginLeft: 0 }}>
                    <Col md={this.props.userData ? 8 : 12}>
                        <MDBFormInline className="md-form" style={{ marginTop: 0, marginBottom: 0 }}>
                            <MDBIcon icon="search" />
                            <input 
                            className="form-control form-control-sm ml-3 w-75 text-white" 
                            type="text" 
                            name="search"
                            placeholder="Search" 
                            aria-label="Search"
                            onChange={this.handleChange}
                            />
                        </MDBFormInline>
                    </Col>
                    <Col md={4} className={this.props.userData ? "" : "display-none"}>
                        <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                            {this.state.avatar ? <Image src={this.state.avatar} roundedCircle style={{ height: "32px", border: "solid 3px #151515" }} /> : <FontAwesomeIcon icon="user" style={{ marginRight: "5%" }} />}
                            </MDBDropdownToggle>
                            <MDBDropdownMenu right={this.state.width > 800 ? true : false} className="dropdown-default SideNav-TopNav__DropDownMenu">
                            <MDBDropdownItem className="SideNav-TopNav-Dropdown-Item-User" style={{ padding: "10px 15px 10px 15px" }}>
                                    <span className="SideNav-TopNav-Dropdown-Item-Span">
                                        {this.state.discordUser ? `${this.state.discordUser.username}#${this.state.discordUser.discriminator}` : ''}
                                    </span>
                            </MDBDropdownItem>
                            <MDBDropdownItem divider />
                            <MDBSideNavLink to="/account" style={{ padding: 0 }}>
                            <MDBDropdownItem className="SideNav-TopNav-Dropdown-Item" style={{ padding: "10px 15px 10px 15px" }}>
                                    <FontAwesomeIcon className="FontAwesomeIcon SideNav-TopNav-Dropdown-Item-Span" icon="user-alt" />
                                    <span className="SideNav-TopNav-Dropdown-Item-Span">Account</span>
                            </MDBDropdownItem>
                            </MDBSideNavLink>
                            <MDBDropdownItem divider />
                            <MDBDropdownItem className="SideNav-TopNav-Dropdown-Item" onClick={() => this.handleLogout()}>
                                <FontAwesomeIcon className="FontAwesomeIcon SideNav-TopNav-Dropdown-Item-Span" icon="sign-out-alt" />
                                <span className="SideNav-TopNav-Dropdown-Item-Span">Logout</span>
                            </MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                        </MDBNavItem>
                    </Col>
                </MDBNavbarNav>
                </MDBNavbar>
                <main style={{ margin: "0 6%", paddingTop: "5.5rem", paddingLeft: this.state.windowWidth > this.state.breakWidth ? "240px" : "0" }}>
                    <Route exact path="/gettingstarted" component={() => (<Gettingstarted />)} />
                    <Route exact path="/whatsnew" component={() => (<WhatsNew />)} />
                    {this.props.commands ? this.routeCommands() : ''}
                    {this.props.commands ? this.routeCategories() : ''}
                    {this.props.commands ? <Route exact path="/commands" component={() => (<Commands search={this.state.search} commands={this.props.commands} />)} /> : ''}
                </main>
                <Footer />
            </div>
        );
    }
}

export default SideNav;