import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { makeStyles } from '@fluentui/react-theme-provider';

import { HomeNavbar, Navbar } from './Navbar';

import {
    HomeContainer
} from '../containers';

import { Footer } from './Footer';

function Navigation(props) {

    const styles = useStyles();

    const renderNavbar = () => {
        switch(props.location.pathname) {
            case "/":
                return <HomeNavbar {...props} />
            default:
                return <Navbar {...props} />
        };
    };

    return(
        <div className={"app " + styles.app}>
            {renderNavbar()}
            <Route exact path="/" component={HomeContainer} />
            <Footer {...props} />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    app: {
        backgroundColor: theme.colors.background
    }
}));

export default withRouter(Navigation);