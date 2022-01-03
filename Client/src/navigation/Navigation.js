import React, { useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@fluentui/react-theme-provider';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './Navbar';
import { SideNav } from './Sidenav';
import { Footer } from './Footer';
import { _HomeRoutes, _DashboardRoutes } from './_Routes';
import { PageNotFoundContainer, ChangelogDetailsContainer } from '../containers';

import { ScrollToTop } from '../components/Common';

function Navigation(props) {

    const { api, changelogs } = props;

    const styles = useStyles();
    const mainPath = `/${props.location.pathname.split("/")[1]}`;

    useEffect(() => {
        api.getChangelogs();
    }, [api]);

    const calculateNavbar = () => {
        const homeRoutes = _HomeRoutes.map(({ path, subRoutes }) => {
            return path || subRoutes.map(subRoute => subRoute.path);
        }).flat();
        const dashboardRoutes = _DashboardRoutes.map(({ path, subRoutes }) => {
            return path || subRoutes.map(subRoute => subRoute.path);
        }).flat();

        if(homeRoutes.map(path => `/${path.split("/")[1]}`).includes(mainPath))
            return renderHomeRoutes();
        else if(dashboardRoutes.map(path => `/${path.split("/")[1]}`).includes(mainPath)) {
            if(props.userData) return renderDashboardRoutes();
            else return <Redirect to="/" />
        }
        else 
            return <PageNotFoundContainer />;
    };

    const renderHomeRoutes = () => {
        const HomeRoutes = _HomeRoutes.map((route) => (
            <Route exact path={route.path} component={route.component} key={route.title} />
        ));

        return(
            <div>
                <Navbar {...props} />
                {changelogs.items && routeChangelogs()}
                {HomeRoutes}
                <Footer {...props} />
            </div>
        );
    };

    const renderDashboardRoutes = () => {
        const DashboardRoutes = _DashboardRoutes.map((route) => {
            if(route.subRoutes) {
                return route.subRoutes.map((subRoute) => (
                    <Route exact path={subRoute.path} component={subRoute.component} key={subRoute.title} />
                ));
            }
            return <Route exact path={route.path} component={route.component} key={route.title} />;
        });
        
        return(
            <SideNav {...props}>
                <AnimatePresence exitBeforeEnter>
                    <Switch location={props.location} key={props.location.key}>
                    {DashboardRoutes}
                    </Switch>
                </AnimatePresence>
                <Footer {...props} />
            </SideNav>
        );
    };

    const routeChangelogs = () => {
        return changelogs.items.map((changelog, index) => (
            <Route exact path={`/changelogs/${changelog.version}`} component={ChangelogDetailsContainer} />
        ));
    };

    return(
        <div className={"app " + styles.app}>
            <ScrollToTop>
                {calculateNavbar()}
            </ScrollToTop>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    app: {
        backgroundColor: theme.colors.background
    }
}));

export default withRouter(Navigation);