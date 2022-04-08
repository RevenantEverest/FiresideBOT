import React,  { Component } from 'react';
import './NavBar.css';

import { withRouter, Redirect } from 'react-router-dom';
import SideNav from './SideNav/SideNav';
import HomeNav from './HomeNav/HomeNav';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    renderHomeNav = () => <HomeNav userData={this.props.userData} getManageServer={this.props.getManageServer} />;

    renderDashboardNav() {
        if(this.props.userData)
            return <SideNav 
                    userData={this.props.userData} 
                    manageServer={this.props.manageServer} 
                    getManageServer={this.props.getManageServer}
                    changelogs={this.props.changelogs} 
                    handleLogout={this.props.handleLogout} 
                    />;
        else return <Redirect to="/" />
    }

    render() {
        let filterArr = ["/", "/features", "/premium", "/faq", "/changelogs"];
        let pathCheck = this.props.location.pathname.split("/").includes("changelogs") || filterArr.includes(this.props.location.pathname);
        return pathCheck ? this.renderHomeNav() : this.renderDashboardNav();
    }
};

export default withRouter(NavBar);