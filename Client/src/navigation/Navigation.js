import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@fluentui/react-theme-provider';
import { Navbar } from './Navbar';
import { SideNav } from './Sidenav';
import { Footer } from './Footer';
import { _HomeRoutes, _DashboardRoutes } from './_Routes';
import { PageNotFoundContainer } from '../containers';
import { AnimatePresence } from 'framer-motion';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        userData: state.auth.user
    };
};

function mapDispatchToProps(dispatch) {
    return {};
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
            else return <Redirect to="/login" />
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
        const DashboardRoutes = _DashboardRoutes.map((route) => (
            <Route exact path={route.path} component={route.component} key={route.title} />
        ));
        
        return(
            <div>
            <SideNav {...props}>
                <AnimatePresence exitBeforeEnter>
                    <Switch location={props.location} key={props.location.key}>
                    {DashboardRoutes}
                    </Switch>
                </AnimatePresence>
                <Footer {...props} />
            </SideNav>
            </div>
        );
    };

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navigation));