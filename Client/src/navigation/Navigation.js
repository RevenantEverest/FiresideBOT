import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { makeStyles } from '@fluentui/react-theme-provider';
import { Navbar } from './Navbar';
import { SideNav } from './Sidenav';
import { Footer } from './Footer';
import {
    DashboardContainer,
    GettingStartedContainer,
    HomeContainer,
    LoginContainer
} from '../containers';

import { _HomeRoutes, _DashboardRoutes } from './_Routes';

function Navigation(props) {

    const styles = useStyles();
    const mainPath = `/${props.location.pathname.split("/")[1]}`;

    const calculateNavbar = () => {
        const homeRoutes = _HomeRoutes.map(({ path, subRoutes }) => {
            return path || subRoutes.map(subRoute => subRoute.path);
        }).flat();
        const dashboardRoutes = _DashboardRoutes.map(({ path, subRoutes }) => {
            return path || subRoutes.map(subRoute => subRoute.path);
        }).flat();

        if(homeRoutes.map(path => `/${path.split("/")[1]}`).includes(mainPath))
            return renderHomeRoutes();
        else if(dashboardRoutes.map(path => `/${path.split("/")[1]}`).includes(mainPath))
            return renderDashboardRoutes();
    };

    const renderHomeRoutes = () => (
        <div>
            <Navbar {...props} />
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/getting_started" component={GettingStartedContainer} />
            <Route exact path="/login" component={LoginContainer} />
            <Footer {...props} />
        </div>
    );

    const renderDashboardRoutes = () => (
        <div>
        <SideNav {...props}>
            <Route exact path="/dashboard" component={DashboardContainer} />
            <Footer {...props} />
        </SideNav>
        </div>
    );

    return(
        <div className={"app " + styles.app}>
            {calculateNavbar()}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    app: {
        backgroundColor: theme.colors.background
    }
}));

export default withRouter(Navigation);