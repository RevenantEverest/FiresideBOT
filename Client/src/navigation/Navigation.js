import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions, guildActions } from '../store';
import { makeStyles } from '@fluentui/react-theme-provider';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './Navbar';
import { SideNav } from './Sidenav';
import { Footer } from './Footer';
import { _HomeRoutes, _DashboardRoutes } from './_Routes';
import { PageNotFoundContainer } from '../containers';

import { ScrollToTop } from '../components/Common';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        userData: state.auth.user,
        guilds: state.guilds,
        managedGuild: state.guilds.managedGuild
    };
};

function mapDispatchToProps(dispatch) {
    return {
        api: {
            logout: () => {
                dispatch(guildActions.updateManagedGuild(null));
                return dispatch(authActions.logout());
            },
            getGuilds: (discordID) => {
                return dispatch(guildActions.getGuilds(discordID));
            },
            updateManagedGuild: (guild) => {
                return dispatch(guildActions.updateManagedGuild(guild));
            }
        }
    };
};

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navigation));